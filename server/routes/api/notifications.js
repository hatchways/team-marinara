const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const passport = require("passport");
const { mailSenderGmailLabelId } = require("../../config/config");

const {
  googleClientSecret,
  googleClientId,
  googleRedirectUrl
} = require("../../config/config");
const User = require("../../models/user");
const Campaign = require("../../models/campaign");
const Step = require("../../models/step");
const Prospect = require("../../models/prospect");

// @route POST /api/notifications
// @desc Receive push notifications from Gmail
// @access all
router.post("/", async (req, res) => {
  try {
    // TODO: authorization and/or validation
    if (
      req.body.subscription !==
      "projects/mail-sender-1/subscriptions/gmail-notifications"
    ) {
      res.status(400).send("Bad Request");
      return;
    }
    // Gmail requires a 200 status acknowledgment
    res.status(200).send("OK");

    // message.data is base64 encoded JSON object
    const decodedData = atob(req.message.data);
    console.log("decodedData:", decodedData);
    const userEmail = decodedData.emailAddress;
    const historyId = decodedData.historyId;

    const gmailToken = User.findOne({ email: userEmail }, "gmailToken");

    // Get emails with history.list()
    getEmail(gmailToken, historyId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving campaign" });
  }
});

/*
 * Test function to show read email functionality
 * @param {string} threadId - id of gmail email thread to read
 * @param req.query.redirectUrl {string} - URL to redirect to
 * after Google auth process
 */
const getEmail = async (gmailToken, historyId) => {
  const oAuth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUrl
  );
  oAuth2Client.setCredentials(gmailToken);
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  // get list of emailIds that have been received
  const history = await gmail.users.history.list({
    userId: "me",
    startHistoryId: historyId,
    labelId: mailSenderGmailLabelId
  });
  console.log("history:", history);
  const messageIds = history[0].messages.map(message => message.id);

  // get latest messages to see which campaigns and prospects they are from
  const emails = await Promise.all(
    messageIds.map(messageId => {
      return gmail.users.messages.get({
        userId: "me",
        id: messageId
      });
    })
  );

  // get labelId which identifies the campaign and prospect email address
  const emailsData = emails.map(email => {
    return {
      labelId: email.labelIds.find(labelId => labelId.startsWith("mscId")),
      prospectEmailAddr: email.body.from
    };
  });

  // Update the prospect status in the step
  await Promise.all(
    emailsData.map(async email => {
      // get the prospectId
      const prospectId = await Prospect.findOne(
        { email: email.prospectEmailAddr },
        "_id"
      );

      // get the campaign and sort to get latest step
      const campaign = await Campaign.findOne({
        gmailLabelId: email.labelId
      })
        .populate("steps", "_id, created, prospects, summary")
        .sort({ "steps.created": "-1" });
      console.log("Latest step date", campaign.steps[0].created);

      const prospectIndex = campaign.prospects.findIndex(
        prospect => prospect.prospectId === prospectId
      );
      campaign.prospects[prospectIndex].status = "Replied";

      // find the prospect in the step and update their status
      //get the latest step
      // const latestStepDate = Math.max(
      //   ...campaign.steps.map(step => step.created)
      // );

      // update the Step status
      const stepProspectIndex = campaign.steps[0].prospects.findIndex(
        prospect => prospect.prospectId === prospectId
      );
      campaign.steps[0].prospects[stepProspectIndex].status = "Replied";
      campaign.steps[0].summary.replied++;

      // update the campaign.stepsSummary
      campaign.stepsSummary.replied++;
    })
  );
};

modules.export = router;
