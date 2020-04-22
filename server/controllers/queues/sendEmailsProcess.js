/*
 * Send emails to all prospects in a step
 */

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
const Thread = require("../../models/thread");

const getGmail = gmailToken => {
  const oAuth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUrl
  );
  oAuth2Client.setCredentials({ refresh_token: gmailToken });

  return google.gmail({ version: "v1", auth: oAuth2Client });
};

/*
 * Send one email via Gmail from user represented by gmailToken
 */
const sendOneEmail = async (
  encodedMailString,
  gmailLabelId,
  campaignGmailLabelId,
  gmail
) => {
  try {
    const gmailResponse = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMailString
        // LabelIds: [gmailLabelId, campaignGmailLabelId]
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
 * @params: data: {stepId, userId, campaignGmailLabelId, campaignGmailLabel, gmailToken, gmailLabelId, campaignId}
 */
const sendEmailsProcess = async data => {
  try {
    const step = await Step.findById(data.stepId).populate(
      "prospects.prospectId",
      "_id firstName lastName email"
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

      const gmail = getGmail(data.gmailToken);

      // If a gmail label hasn't been created for this campaign, create one
      // if (!data.campaignGmailLabelId) {
      //   const label = await gmail.users.labels.create({
      //     userId: "me",
      //     requestBody: {
      //       labelListVisibility: "labelHide", // do not show label in user's label list
      //       messageListVisibility: "show", // show emails with this label in user's inbox
      //       name: data.campaignGmailLabel
      //     }
      //   });
      //   data.campaignGmailLabelId = label.data.id;

      //   const campaign = await Campaign.findById(data.campaignId);
      //   campaign.gmailLabelId = label.data.id;
      //   await campaign.save();
      // }

      //Staggers sending of emails by 1 per second
      const gmailResponse = await new Promise(resolve =>
        setTimeout(
          () =>
            resolve(
              sendOneEmail(
                encodedMailString,
                data.gmailLabelId,
                data.campaignGmailLabelId,
                gmail
              )
            ),
          1000
        )
      );

      console.log("gmailResponse", gmailResponse);

      if (!gmailResponse.errors) {
        step.prospects[i].status = "Sent";
        step.prospects[i].gmailMessageId = gmailResponse.id;
        step.prospects[i].gmailThreadId = gmailResponse.threadId;
        step.summary.sent++;
        await step.save();

        const newThread = new Thread({
          threadId: gmailResponse.threadId,
          stepId: data.stepId,
          campaignId: data.campaignId,
          prospectId: step.prospects[i].prospectId._id,
          userId: data.userId
        });
        await newThread.save();
      }
    }

    return true;
  } catch (error) {
    console.log("Error running sendEmailsProcess: ", error);
  }
};

module.exports = { sendEmailsProcess };
