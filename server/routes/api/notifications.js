const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const passport = require("passport");
const { pubSubSubscriptionName } = require("../../config/config");

const {
  googleClientSecret,
  googleClientId,
  googleRedirectUrl
} = require("../../config/config");
const User = require("../../models/user");
const Campaign = require("../../models/campaign");
const Step = require("../../models/step");
const Prospect = require("../../models/Prospect");

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
    console.log("decodedData:", decodedData);
    const userEmail = decodedData.emailAddress;
    const historyId = decodedData.historyId;

    console.log("userEmail:", userEmail);
    const user = await User.findOne(
      { email: userEmail },
      "gmailToken gmailLabelId"
    );
    console.log("user:", user);

    // Get emails with history.list()
    await getEmail(user.gmailToken, historyId, user.gmailLabelId);

    // Gmail requires a 200 status acknowledgment
    res.status(200).send("OK");
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
const getEmail = async (gmailToken, historyId, gmailLabelId) => {
  const oAuth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUrl
  );
  oAuth2Client.setCredentials({ refresh_token: gmailToken });
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  // get list of emailIds that have been received
  const history = await gmail.users.history.list({
    userId: "me",
    startHistoryId: historyId,
    labelId: gmailLabelId
  });

  if (!history.data.history) {
    // no new messages
    console.log("No new messages");
    return true;
  }

  // See https://developers.google.com/gmail/api/v1/reference/users/history/list for rough data structure of history
  const messageData = history.data.history.flat();
  console.log(">>>>>>messageData:", messageData);

  // get only the threads that have received new messages
  const messagesAdded = messageData
    .filter(thread => thread.messagesAdded)
    .map(thread => thread.messagesAdded);

  if (messagesAdded.length === 0) {
    // no new messages
    console.log("No new messages added");
    return true;
  }
  console.log(">>>>>>>>messagesAdded:", messagesAdded);

  const msgThreadIds = messagesAdded
    .map(message => {
      console.log("message:", message);
      return message.map(msg => {
        console.log("msg:", msg);
        return { messageId: msg.message.id, threadId: msg.message.threadId };
      });
    })
    .flat();
  console.log(">>>>>>>messageIds:", msgThreadIds);

  // get latest threads to see which campaigns and prospects they are from
  const threads = await Promise.all(
    msgThreadIds.map(async messageThreadId => {
      const thread = await gmail.users.threads.get({
        userId: "me",
        id: messageThreadId.threadId,
        format: "metadata" // return only headers, ids and labels
      });
      thread.messageId = messageThreadId.messageId;
      return thread;
    })
  );
  threads.forEach(thread => {
    console.log("thread.data:", thread.messages);
  });

  // \u003cdarrengreenfield555@gmail.com\u003e
  // get labelId which identifies the campaign and prospect email address
  const emailsData = threads.map(thread => {
    const labelId = thread.messages[0].labelIds.find(labelId =>
      labelId.startsWith("mscId")
    );

    const newMessage = thread.messages.find(
      message => message.id === thread.messageId
    );

    const fromObj = newMessage.payload.headers.find(
      header => header["name"] === "From"
    );
    console.log("fromObj.value", fromObj["value"]);
    const emailAddr = fromObj["value"].match(/<(.*)>/);
    console.log("email address:", emailAddr[1]);
    return {
      labelId: labelId,
      prospectEmailAddr: emailAddr[1]
    };
  });
  for (const email of emailsData) {
    console.log(">>>>>>>>>>>>>emailsData:", email);
  }

  // Update the prospect status in the step
  await Promise.all(
    emailsData.map(async email => {
      // get the prospectId
      const prospectId = await Prospect.findOne(
        { email: email.prospectEmailAddr },
        "_id"
      );

      console.log("prospectId:", prospectId);

      // get the campaign and sort to get latest step
      const campaign = await Campaign.findOne({
        gmailLabelId: email.labelId
      })
        .populate("steps", "_id, created, prospects, summary")
        .sort({ "steps.created": "-1" });

      if (!campaign) {
        console.log(`No campaign found with gmailLabelId: ${email.labelId}`);
        return true;
      }
      console.log("Latest step date", campaign.steps[0].created);

      const prospectIndex = campaign.prospects.findIndex(
        prospect => prospect.prospectId === prospectId
      );
      console.log("prospectIndex", prospectIndex);
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
  console.log("SAVING.........");
  await campaign.save();
};

module.exports = router;
