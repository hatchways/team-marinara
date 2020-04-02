const { google } = require("googleapis");
const express = require("express");
const router = express.Router();
const mailComposer = require("nodemailer/lib/mail-composer"); // Helps formatting of emails in base64
const User = require("../../models/user.js");
const { client_secret, client_id } = require("../../config/gmail-secret.json");

/*
 * Scopes dictate what we are allowed to do on behalf of the user and what the user is asked to approve
 * If modifying these scopes, existing tokens will need to be deleted
 */
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
];

// Url user redirected to after Google authorization
// If modified it also needs to be changed at https://console.developers.google.com/apis/credentials?project=mail-sender-1
const SUCCESS_REDIRECT_URL = "http://localhost:3000/processGmailToken";

/*************
 * TODO: Get UID of current logged in user, likely from req.header
 **************/
const userId = "5e84b3101bd834092a28464f";

/**
 * Check if gmail authorization token exists for the user
 */
router.get("/checkToken", async (req, res) => {
  /******************
   * Get userId from req when login/reg routes finished
   * Get user object from /users route
   *******************/
  const loggedInUser = await User.findById(userId);

  let tokenExists = loggedInUser.gmailToken ? true : false;

  res.status(200).json({ tokenExists: tokenExists });
});

/*
 * Generate url to redirect user to for authorization on Google
 */
router.get("/getAuthUrl", (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    SUCCESS_REDIRECT_URL
  );
  console.log(req.query.endRoute);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    // ONLY NEEDED IN DEV to ensure refresh token is provided every time token is requested
    ...(!process.env.NODE_ENV && { prompt: "consent" }),
    // pass route that success/failure dialog will redirect to on close
    state: encodeURIComponent(req.query.endRoute),
  });

  res.status(200).json({ authUrl: authUrl });
});

/*
 * Called when user has authorized Mail Sender to access their Gmail account
 * Saves new token to database under that user
 * @param req.query.code {String} expected
 */
router.post("/processToken", async (req, res) => {
  try {
    if (!req.query.code) res.status(400).send("Error: ", req.query.error);

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      SUCCESS_REDIRECT_URL
    );

    // Use returned code to get access tokens for user
    const { tokens } = await oAuth2Client.getToken(req.query.code);

    // Store the token to db under user
    /********
     * Change to get userId from req
     *********/
    const user = await User.findById(userId);
    user.gmailToken = tokens.refresh_token;
    await user.save().then((result, err) => {
      if (err) {
        console.log("Error writing token to users collection:", err);
        res.status(500).send("Error writing to database");
      }
    });

    oAuth2Client.setCredentials(tokens);
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    let emailAddr = await gmail.users
      .getProfile({ userId: "me" })
      .then((response) => {
        return response.data.emailAddress;
      });

    res.status(200).json({ tokenSaved: true, emailAddr: emailAddr });
  } catch (error) {
    console.error("Error retrieving access token", error);
    res.status(500).send("Error processing token");
  }
});

/*
 * Test function to show send email functionality
 * @param: mail - nodemailer mailComposer object with to, subject, text and textEncoding properties
 */
async function sendEmail(mail) {
  const loggedInUser = await User.findById(userId);
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    SUCCESS_REDIRECT_URL
  );
  oAuth2Client.setCredentials({ refresh_token: loggedInUser.gmailToken });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  mail = new mailComposer({
    to: "darren@darrengreenfield.com",
    text: "This is a test email",
    subject: "OMG it worked!",
    textEncoding: "base64",
  });

  await mail.compile().build(async (err, msg) => {
    if (err) {
      return console.log("Error compiling email " + error);
    }

    const encodedMessage = Buffer.from(msg)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send(
      {
        userId: "me",
        resource: {
          raw: encodedMessage,
        },
      },
      (err, result) => {
        if (err) {
          return console.log("gmail send returned an error: " + err);
        }

        // In app we'd save result.data.threadId to database so can track later

        console.log("Send email success. Reply from server:", result.data);
      }
    );
  });
}

/*
 * Test function to show read email functionality
 * @param {string} threadId - id of gmail email thread to read
 */
async function readEmail(threadId) {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    SUCCESS_REDIRECT_URL
  );
  oAuth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  // get list of email threads
  const threads = await gmail.users.threads.list({ userId: "me" });
  threadId = threads.data.threads[0].id;

  // get latest thread details
  const thread = await gmail.users.threads.get({ userId: "me", id: threadId });
  console.log(thread.data.messages[0]);
}

module.exports = router;
