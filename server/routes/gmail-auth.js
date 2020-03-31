const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const mailComposer = require("nodemailer/lib/mail-composer");

const User = require("../models/user.js");
const { client_secret, client_id, redirect_uris } = require("../gmail-secret.json");

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

/*
 * Scopes dictate what we are allowed to do on behalf of the user.
 * If modifying these scopes, existing tokens will need to be deleted
 */
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
];

/*
 * TODO: Get UID of current logged in user, likely from req.header
 */
const userId = "5e827c5ed999b93a267ef847";

router.get("/", authorize);
router.get("/success", processToken);

/*
 * Generate url to authorize user on Google and get new token.
 * @param: oAuth2Client Auth object
 */
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // ONLY NEEDED IN DEV to ensure refresh token is provided every time
  });
  return authUrl;
}

/**
 * Check if gmail authorization token exists for the user, if not, get a new one
 */
async function authorize(req, res, next) {
  try {
    const loggedInUser = await User.findById(userId);

    if (loggedInUser.gmail_token) {
      oAuth2Client.setCredentials({ refresh_token: loggedInUser.gmail_token });
      res.send("Token already exists");

      // Redirect back to user home page
      // next(oAuth2Client); OR res.redirect('/')
      readEmail(oAuth2Client);
    } else {
      console.log("no token");
      res.redirect(getNewToken(oAuth2Client));
    }
  } catch (error) {
    console.log(error);
  }
}

/*
 * When user has authorized Mail Sender with Gmail, user is redirected here
 * Saves new token to database under that user
 */
async function processToken(req, res, next) {
  try {
    const { tokens } = await oAuth2Client.getToken(req.query.code);
    oAuth2Client.setCredentials(tokens);

    // Store the token to disk for later program executions
    User.updateOne({ _id: userId }, { gmail_token: tokens.refresh_token }).then((err, res) => {
      if (err) console.log(err);
    });

    // Redirect back to user home page
    // res.redirect('/');
    readEmail(oAuth2Client);
  } catch (error) {
    console.error("Error retrieving access token", error);
  }

  res.send("Success");
}

/*
 * Test function to show send email functionality
 * @param: oAuth2Client - Auth object with valid gmail credentials attached
 * @param: mail - nodemailer mailComposer object with to, subject, text and textEncoding properties
 */
async function sendEmail(oAuth2Client, mail) {
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
          return console.log("NODEMAILER - The API returned an error: " + err);
        }

        // TODO: Save result.data.threadId to database so can track later

        console.log("NODEMAILER - Sending email reply from server:", result.data);
      },
    );
  });
}

/*
 * Test function to show read email functionality
 * @param: oAuth2Client - Auth object with valid gmail credentials attached
 * @param {string} threadId - id of gmail email thread to read
 */
async function readEmail(oAuth2Client, threadId) {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  // get list of email threads
  const threads = await gmail.users.threads.list({ userId: "me" });
  threadId = threads.data.threads[0].id;

  // get latest thread details
  const thread = await gmail.users.threads.get({ userId: "me", id: threadId });
  console.log(thread.data.messages[0]);
}

module.exports = router;
