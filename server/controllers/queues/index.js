/*
 *   Create and add jobs to queues
 */

const Queue = require("bull");
const REDIS_URL = require("../../config/config").redisURL;
const { sendEmailsProcess } = require("./sendEmailsJob");

const sendEmailsQueue = async (campaignId, stepId, userId, gmailToken) => {
  // Create or connect to queue
  try {
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

    // Define a local completed event
    sendEmailsQueue.on("completed", (job, result) => {
      console.log(`Job completed with result ${result}`);
    });
  } catch (error) {
    console.log("Error adding job to queue: ", error);
  }
};

module.exports = { sendEmailsQueue };
