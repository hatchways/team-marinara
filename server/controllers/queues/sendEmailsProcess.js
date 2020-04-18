const { google } = require("googleapis");
const mailComposer = require("nodemailer/lib/mail-composer"); // Helps formatting of emails in base64
const draftToHtml = require("draftjs-to-html");

const {
  googleClientSecret,
  googleClientId,
  googleRedirectUrl
} = require("../../config/config");
const Step = require("../../models/step");
const Variable = require("../../models/variable");

/*
 * Send one email via Gmail from user represented by gmailToken
 */
const sendOneEmail = async (encodedMailString, gmailToken) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      googleClientId,
      googleClientSecret,
      googleRedirectUrl
    );
    oAuth2Client.setCredentials({ refresh_token: gmailToken });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const gmailResponse = await gmail.users.messages.send({
      userId: "me",
      resource: {
        raw: encodedMailString
      }
    });

    return Promise.resolve(gmailResponse.data);
  } catch (error) {
    console.log("Gmail send returned an error: " + error);
    // send Promise.resolve() as we want to continue sending other emails
    return Promise.resolve(error);
  }
};

/*
 * Replace variables in step e.g. {{firstName}} with relevant content
 */
const replaceVariables = (prospect, emailContent, variables) => {
  const regEx = /{{(.+?)}}/g;

  return emailContent.replace(regEx, (match, bracketsContent) => {
    const variable = variables.find(
      obj => obj.variableName === bracketsContent
    );
    if (variable.collectionName === "prospects") {
      return prospect.prospectId[variable.fieldName];
    }
  });
};

/*
 * Convert plain text to Gmail accepted format: RFC 2822 formatted and base64url encoded string
 */
const convertToBufferString = async (
  prospect,
  emailSubject,
  emailWithVariables
) => {
  // Generate RFC822 formatted e-mail message that can be streamed to SMTP
  const encodedMail = await new mailComposer({
    to: prospect.prospectId.email,
    subject: emailSubject,
    html: emailWithVariables,
    textEncoding: "base64"
  })
    .compile()
    .build();

  // Convert RFC822 message to Buffer String
  return Buffer.from(encodedMail)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

/*
 * @params: data: {campaignId, stepId, userId}
 */
const sendEmailsProcess = async data => {
  try {
    const step = await Step.findById(data.stepId).populate(
      "prospects.prospectId",
      "firstName lastName email"
    );
    const variables = await Variable.find();

    const emailSubject = step.subject;
    const emailContent = draftToHtml(JSON.parse(step.content));

    for (let i = 0; i < step.prospects.length; i++) {
      const prospect = step.prospects[i];

      // Replace variables with content
      const emailWithVariables = replaceVariables(
        prospect,
        emailContent,
        variables
      );

      const encodedMailString = await convertToBufferString(
        prospect,
        emailSubject,
        emailWithVariables
      );

      //Staggers sending of emails to 1 per second
      const gmailResponse = await new Promise(resolve =>
        setTimeout(
          () => resolve(sendOneEmail(encodedMailString, data.gmailToken)),
          1000
        )
      );

      console.log("gmailResponse", gmailResponse);

      if (!gmailResponse.errors) {
        step.prospects[i].status = "Sent";
        step.prospects[i].gmailMessageId = gmailResponse.id;
        step.prospects[i].gmailThreadId = gmailResponse.threadId;
        step.summary.sent++;
        step.save();
      }
    }

    return true;
  } catch (error) {
    console.log("Error running sendEmailsProcess: ", error);
  }
};

module.exports = { sendEmailsProcess };
