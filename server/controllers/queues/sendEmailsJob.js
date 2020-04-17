const { google } = require("googleapis");
const mailComposer = require("nodemailer/lib/mail-composer"); // Helps formatting of emails in base64
const { googleClientSecret, googleClientId } = require("../../config/config");

/*
 * Test function to show send email functionality
 * @param: mail - nodemailer mailComposer object with to, subject, text and textEncoding properties
 * @param req.query.redirectUrl {string} - URL to redirect to
 * after Google auth process
 */

const sendEmailsProcess = async data => {
  // Get email template
  // Get Prospects
  // Loop through prospects
  // Build email
  // Send email
};

const sendOneEmail = async mail => {
  const userId = "5e84b3101bd834092a28464f";
  const loggedInUser = await User.findById(userId);
  const oAuth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    req.query.redirectUrl
  );
  oAuth2Client.setCredentials({ refresh_token: loggedInUser.gmailToken });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  mail = new mailComposer({
    to: "darren@darrengreenfield.com",
    text: "This is a test email",
    subject: "OMG it worked!",
    textEncoding: "base64"
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
          raw: encodedMessage
        }
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
};

module.exports = { sendEmailsProcess };
