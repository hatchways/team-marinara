const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { pubSubSubscriptionName } = require("../../config/config");

const {
  googleClientSecret,
  googleClientId,
  googleRedirectUrl
} = require("../../config/config");
const User = require("../../models/user");
const Campaign = require("../../models/campaign");
const Step = require("../../models/step");
const Thread = require("../../models/thread");

// @route POST /api/notifications
// @desc Receive push notifications from Gmail
// @access all
router.post("/", async (req, res) => {
  try {
    if (req.body.subscription !== pubSubSubscriptionName) {
      res.status(400).send("Bad Request");
      return;
    }

    // message.data is base64 encoded JSON object
    const decodedData = await JSON.parse(
      Buffer.from(req.body.message.data, "base64").toString()
    );
    const userEmail = decodedData.emailAddress;
    const historyId = decodedData.historyId;

    const user = await User.findOne(
      { email: userEmail },
      "gmailToken gmailHistoryId"
    );

    await getEmail(user.gmailToken, user.gmailHistoryId);

    // Replace last synced historyId for user with latest
    user.gmailHistoryId = historyId;
    await user.save();

    // Gmail requires a 200 status acknowledgment to stop sending notifications
    console.log(
      `FINISHED processing notification for ${userEmail}, sending res(200)...`
    );
    res.status(200).send("OK");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving campaign" });
  }
});

const getNewThreadIds = async (gmail, startHistoryId) => {
  // get list of email ids that have been received since last check
  const history = await gmail.users.history.list({
    userId: "me",
    startHistoryId: startHistoryId,
    historyTypes: "messageAdded"
  });

  if (!history.data.history) {
    console.log("No new messages");
    return false;
  }
  const messageData = history.data.history.flat();

  // get only the threads that have received new messages
  const messagesAdded = messageData
    .filter(thread => thread.messagesAdded)
    .map(thread => thread.messagesAdded);

  if (messagesAdded.length === 0) {
    console.log("No new messages added");
    return false;
  }

  // get just the threadIds of the messages
  return messagesAdded
    .map(message => {
      return message.map(msg => {
        return msg.message.threadId;
      });
    })
    .flat();
};

/*
 * Gets email
 * @param {string} threadId - id of gmail email thread to read
 * @param req.query.redirectUrl {string} - URL to redirect to
 * after Google auth process
 */
const getEmail = async (gmailToken, startHistoryId) => {
  const oAuth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUrl
  );
  oAuth2Client.setCredentials({ refresh_token: gmailToken });
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const threadIds = await getNewThreadIds(gmail, startHistoryId);
  if (threadIds === false) return false;

  // Find the thread records that match the ids
  const threadRecords = await Promise.all(
    threadIds.map(async threadId => {
      const threadRecord = await Thread.findOne({
        threadId: threadId
      });
      return threadRecord;
    })
  );

  // Update the status and replied counters of relevant records
  await Promise.all(
    threadRecords.map(async threadRecord => {
      if (threadRecord) {
        const campaign = await Campaign.findById(threadRecord.campaignId);
        const step = await Step.findById(threadRecord.stepId);

        const prospectIndex = campaign.prospects.findIndex(prospect =>
          prospect.prospectId.equals(threadRecord.prospectId)
        );
        campaign.prospects[prospectIndex].status = "Replied";
        campaign.stepsSummary.replied++;

        step.summary.replied++;
        const stepProspectIndex = step.prospects.findIndex(prospect =>
          prospect.prospectId.equals(threadRecord.prospectId)
        );
        step.prospects[stepProspectIndex].status = "Replied";

        await campaign.save();
        await step.save();
      }
    })
  );
};

module.exports = router;
