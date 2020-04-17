/*
 *   Create and add jobs to queues
 */

const Queue = require("bull");
const REDIS_URL = require("../../config/config").redisURL;
const sendEmailsProcess = require("./sendEmailsJob.js");

const sendEmailsQueue = async (campaignId, stepId, userId) => {
  // Create or connect to queue
  const sendEmailsQueue = new Queue("sendEmails", REDIS_URL);

  const sendEmailsJob = await sendEmailsQueue.add({
    campaignId: campaignId,
    stepId: stepId,
    userId: userId
  });

  sendEmailsQueue.process(async job => {
    console.log(job.data);
    return sendEmailsProcess(job.data);
  });
};

module.exports = { sendEmailsQueue };
