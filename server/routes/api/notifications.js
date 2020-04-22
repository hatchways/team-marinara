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
    console.log("decodedData:", decodedData);
    const userEmail = decodedData.emailAddress;
    const historyId = decodedData.historyId;

    console.log("userEmail:", userEmail);
    const user = await User.findOne(
      { email: userEmail },
      "gmailToken gmailHistoryId"
    );
    console.log("user:", user);

    // Get emails with history.list()
    await getEmail(user.gmailToken, user.gmailHistoryId);

    // Replace last synced historyId for user with latest
    user.gmailHistoryId = historyId;
    await user.save();

    // Gmail requires a 200 status acknowledgment
    console.log("FINISHED, sending res(200)...");
    res.status(200).send("OK");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving campaign" });
  }
});

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

  // get list of emailIds that have been received
  const history = await gmail.users.history.list({
    userId: "me",
    startHistoryId: startHistoryId
    // labelId: gmailLabelId
  });

  // console.log("history:", history);
  // console.log("history.data:", history.data);
  if (!history.data.history) {
    // no new messages
    console.log("No new messages");
    return true;
  }

  // See https://developers.google.com/gmail/api/v1/reference/users/history/list for rough data structure of history
  const messageData = history.data.history.flat();
  // console.log(">>>>>>messageData:", messageData);

  // get only the threads that have received new messages
  const messagesAdded = messageData
    .filter(thread => thread.messagesAdded)
    .map(thread => thread.messagesAdded);

  if (messagesAdded.length === 0) {
    // no new messages
    console.log("No new messages added");
    return true;
  }
  // console.log(">>>>>>>>messagesAdded:", messagesAdded);

  const msgThreadIds = messagesAdded
    .map(message => {
      // console.log("message:", message);
      return message.map(msg => {
        // console.log("msg:", msg);
        return { messageId: msg.message.id, threadId: msg.message.threadId };
      });
    })
    .flat();
  // console.log(">>>>>>>messageIds:", msgThreadIds);

  // Find the prospects with this Thread ID
  const threadRecords = await Promise.all(
    msgThreadIds.map(async msgThreadId => {
      const threadRecord = await Thread.findOne({
        threadId: msgThreadId.threadId
      });
      return threadRecord;
    })
  );

  // // get latest threads to see which campaigns and prospects they are from
  // const threads = await Promise.all(
  //   msgThreadIds.map(async messageThreadId => {
  //     const thread = await gmail.users.threads.get({
  //       userId: "me",
  //       id: messageThreadId.threadId,
  //       format: "metadata" // return only headers, ids and labels
  //     });
  //     thread.messageId = messageThreadId.messageId;
  //     return thread;
  //   })
  // );
  // threads.forEach(thread => {
  //   console.log("thread.data:", thread.messages);
  // });

  // // \u003cdarrengreenfield555@gmail.com\u003e
  // // get labelId which identifies the campaign and prospect email address
  // const emailsData = threads.map(thread => {
  //   const labelId = thread.messages[0].labelIds.find(labelId =>
  //     labelId.startsWith("mscId")
  //   );

  //   const newMessage = thread.messages.find(
  //     message => message.id === thread.messageId
  //   );

  //   const fromObj = newMessage.payload.headers.find(
  //     header => header["name"] === "From"
  //   );
  //   console.log("fromObj.value", fromObj["value"]);
  //   const emailAddr = fromObj["value"].match(/<(.*)>/);
  //   console.log("email address:", emailAddr[1]);
  //   return {
  //     labelId: labelId,
  //     prospectEmailAddr: emailAddr[1]
  //   };
  // });
  // for (const email of emailsData) {
  //   console.log(">>>>>>>>>>>>>emailsData:", email);
  // }

  // Update the prospect status in the step
  await Promise.all(
    threadRecords.map(async threadRecord => {
      if (threadRecord) {
        console.log(">>>>>>>>>>>>threadRecord: ", threadRecord);
        const campaign = await Campaign.findById(threadRecord.campaignId);
        const step = await Step.findById(threadRecord.stepId);

        const prospectIndex = campaign.prospects.findIndex(prospect =>
          prospect.prospectId.equals(threadRecord.prospectId)
        );
        campaign.prospects[prospectIndex].status = "Replied";
        campaign.stepsSummary.replied++;

        // update the Step status
        step.summary.replied++;
        const stepProspectIndex = step.prospects.findIndex(prospect =>
          prospect.prospectId.equals(threadRecord.prospectId)
        );
        step.prospects[stepProspectIndex].status = "Replied";
        console.log("SAVING.........");
        await campaign.save();
        await step.save();
      }
    })
  );
};

module.exports = router;
