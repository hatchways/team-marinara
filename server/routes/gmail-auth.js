const fs = require("fs");
const readline = require("readline");

const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const User = require("../models/user.js");
const gmailCredentials = require("../gmail-secret.json");

const { client_secret, client_id, redirect_uris } = gmailCredentials;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

/*
 * TODO: Get UID of current logged in user, likely from req.header
 */
const userId = "5e827c5ed999b93a267ef847";

router.get("/", authorize);
router.get("/success", processToken);

async function processToken(req, res, next) {
  try {
    const { tokens } = await oAuth2Client.getToken(req.query.code);
    console.log("tokens: ", tokens);
    oAuth2Client.setCredentials(tokens);

    // Store the token to disk for later program executions
    User.updateOne({ _id: userId }, { gmail_token: tokens.refresh_token }).then((err, res) => {
      if (err) console.log(err);
    });

    // do something with authorization
  } catch (error) {
    console.error("Error retrieving access token", error);
  }

  res.send("Success");
}

function getNewToken(oAuth2Client) {
  // If modifying these scopes, delete token
  const SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send",
  ];

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // ONLY NEEDED IN DEV
  });
  return authUrl;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 */
async function authorize(req, res, next) {
  try {
    // Check if we have previously stored a token
    const loggedInUser = await User.findById(userId);

    if (loggedInUser.gmail_token) {
      oAuth2Client.setCredentials(loggedInUser.gmail_token);
      res.send("Token already exists");
      // do something with authorisation
    } else {
      console.log("no token");
      res.redirect(getNewToken(oAuth2Client));
    }
  } catch (error) {
    console.log(error);
  }
}

async function main(req, res, next) {
  return res.redirect(await authorize());
  return res.send("Success");
}

module.exports = router;
