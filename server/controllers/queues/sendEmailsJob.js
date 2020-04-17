const { google } = require("googleapis");
const mailComposer = require("nodemailer/lib/mail-composer"); // Helps formatting of emails in base64
const {
  googleClientSecret,
  googleClientId,
  googleRedirectUrl
} = require("../../config/config");
const Step = require("../../models/step");

/*
 * @params: {campaignId, stepId, userId}
 */
const sendEmailsProcess = async data => {
  // Get email template   // Get Prospects
  try {
    console.log("sendEmailsProcess Starting...");
    const step = await Step.findById(data.stepId).populate(
      "prospects.prospectId",
      "firstName lastName email"
    );

    // Loop through prospects
    const emailSubject = step.subject;
    const emailContent = step.content;

    for (const prospect of step.prospects) {
      // Build email
      const mail = new mailComposer({
        to: prospect.email,
        subject: emailSubject,
        text: emailContent,
        textEncoding: "base64"
      });
      console.log(mail);

      const encodedMail = await mail.compile().build((err, msg) => {
        if (err) {
          return console.log(
            `Error compiling email for ${prospect.email}. Error: ${error}`
          );
        }
        console.log("Mail encoded");

        return Buffer.from(msg)
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
      });

      // Send email
      console.log("Calling sendOneMail");
      await sendOneEmail(encodedMail, data.gmailToken);
    }

    return true;
  } catch (error) {
    console.log("Error running sendEmailsProcess: ", error);
  }
};

const sendOneEmail = async (encodedMail, gmailToken) => {
  const oAuth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUrl
  );
  oAuth2Client.setCredentials({ refresh_token: gmailToken });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  console.log(encodedMail);
  // await gmail.users.messages.send(
  //   {
  //     userId: "me",
  //     resource: {
  //       raw: encodedMail
  //     }
  //   },
  //   (err, result) => {
  //     if (err) {
  //       return console.log("Gmail send returned an error: " + err);
  //     }

  //     // In app we'd save result.data.threadId to database so can track later

  //     console.log("Send email success. Reply from server:", result.data);
  //     return Promise.resolve();
  //   }
  // );
};

module.exports = { sendEmailsProcess };
