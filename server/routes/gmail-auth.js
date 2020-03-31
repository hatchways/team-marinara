const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const mailComposer = require("nodemailer/lib/mail-composer"); // Helps formatting of emails in base64
const User = require("../models/user.js");
const { client_secret, client_id, redirect_uris } = require("../gmail-secret.json");

/*
 * Scopes dictate what we are allowed to do on behalf of the user and what the user is asked to approve
 * If modifying these scopes, existing tokens will need to be deleted
 */
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
];

/*************
 * TODO: Get UID of current logged in user, likely from req.header
 **************/
const userId = "5e827c5ed999b93a267ef847";

router.get("/", checkForToken);
router.get("/success", processToken); // Google redirects here once user has authorised Mail-Sender

/*
 * Generate url to redirect user to for authorization on Google and get new token.
 */
function getNewTokenUrl() {
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    // ONLY NEEDED IN DEV to ensure refresh token is provided every time token is requested
    ...(!process.env.NODE_ENV && { prompt: "consent" }),
  });
  return authUrl;
}

/**
 * Check if gmail authorization token exists for the user, if not, get a new one
 */
async function checkForToken(req, res, next) {
  try {
    const loggedInUser = await User.findById(userId);

    if (loggedInUser.gmail_token) {
      console.log("Token exists");

      /***********
       * Redirect back to user home page
       ***********/
      next(); // OR res.redirect('/')
    } else {
      console.log("no token");
      res.redirect(getNewTokenUrl());
    }
  } catch (error) {
    console.log(error);
  }
}

/*
 * When user has authorized Mail Sender with Gmail, user is redirected here
 * Saves new token to database under that user
 */
async function processToken(req, res) {
  try {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const { tokens } = await oAuth2Client.getToken(req.query.code);

    // Store the token to db under user
    const user = await User.findById(userId);
    user.gmail_token = tokens.refresh_token;
    await user.save().then((res, err) => {
      if (err) {
        console.log("Error writing token to users collection:", err);
        res.status(500).redirect("/");
      }
    });

    /***********
     * Redirect back to user home page
     ***********/
    res.redirect("/");
  } catch (error) {
    console.error("Error retrieving access token", error);
    res.status(500).redirect("/");
  }
}

/*
 * Test function to show send email functionality
 * @param: mail - nodemailer mailComposer object with to, subject, text and textEncoding properties
 */
async function sendEmail(mail) {
  const loggedInUser = await User.findById(userId);
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials({ refresh_token: loggedInUser.gmail_token });

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

        // TODO: Save result.data.threadId to database so can track later

        console.log("Send email success. Reply from server:", result.data);
      },
    );
  });
}

/*
 * Test function to show read email functionality
 * @param {string} threadId - id of gmail email thread to read
 */
async function readEmail(threadId) {
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
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
