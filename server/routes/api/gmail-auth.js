const { google } = require("googleapis");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/user.js");
const { googleClientSecret, googleClientId } = require("../../config/config");

/*
 * Scopes dictate what we are allowed to do on behalf of the user and what the user is asked to approve
 * If modifying these scopes, existing tokens will need to be deleted
 */
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send"
];

/*
 * Check if gmail authorization token exists for the user
 * Access: logged in users
 */
router.get(
  "/checkToken",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const loggedInUser = await User.findById(req.user.id);

    let tokenExists = loggedInUser.gmailToken ? true : false;
    res.status(200).json({ tokenExists: tokenExists });
  }
);

/*
 * Generate url to redirect user to for authorization on Google
 * @param req.query.redirectUrl {string} - URL to redirect to
 * after Google auth process
 * Access: logged in users
 */
router.get(
  "/getAuthUrl",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const oAuth2Client = new google.auth.OAuth2(
      googleClientId,
      googleClientSecret,
      req.query.redirectUrl
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      // ONLY NEEDED IN DEV to ensure refresh token is provided every time token is requested
      ...(!process.env.NODE_ENV && { prompt: "consent" })
    });

    res.status(200).json({ authUrl: authUrl });
  }
);

/*
 * Called when user has authorized Mail Sender to access their Gmail account
 * Saves new token to database under that user
 * @param req.query.code {String} code provided by Google from auth process
 * @param req.query.redirectUrl {string} - URL to redirect to
 * after Google auth process
 * Access: logged in users
 */
router.post(
  "/processToken",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log("Process Token running...");
      if (!req.query.code) res.status(400).send("Error: ", req.query.error);

      const oAuth2Client = new google.auth.OAuth2(
        googleClientId,
        googleClientSecret,
        req.query.redirectUrl
      );

      // Use returned code to get access tokens for user
      const { tokens } = await oAuth2Client.getToken(req.query.code);

      // Store the token to db under user
      const user = await User.findById(req.user.id);
      user.gmailToken = tokens.refresh_token;
      await user.save().then((result, err) => {
        if (err) {
          console.log("Error writing token to users collection:", err);
          res.status(500).send("Error writing to database");
        }
      });

      oAuth2Client.setCredentials(tokens);

      // Get email address that was just linked to return to user
      const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
      let emailAddr = await gmail.users
        .getProfile({ userId: "me" })
        .then(response => {
          return response.data.emailAddress;
        });

      res.status(200).json({ tokenSaved: true, emailAddr: emailAddr });
    } catch (error) {
      console.error("Error retrieving access token", error);
      res.status(500).send("Error processing token");
    }
  }
);

module.exports = router;
