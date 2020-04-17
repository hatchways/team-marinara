/*
 *   Create and add jobs to queues
 */

const Queue = require("bull");
const REDIS_URL = require("../../config/config").redisURL;
const { sendEmailsProcess } = require("./sendEmailsProcess");

const sendEmailsQueue = async (campaignId, stepId, userId, gmailToken) => {
  try {
    // Create or connect to queue
    const sendEmailsQueue = new Queue("sendEmails", REDIS_URL);

    sendEmailsQueue.process(async job => {
      await sendEmailsProcess(job.data);
    });

    const sendEmailsJob = await sendEmailsQueue.add({
      campaignId: campaignId,
      stepId: stepId,
      userId: userId,
      gmailToken: gmailToken
    });

    sendEmailsQueue.on("completed", (job, result) => {
      console.log(`Job completed with result ${result}`);
    });
  } catch (error) {
    console.log("Error adding job to queue: ", error);
  }
};

module.exports = { sendEmailsQueue };
