/*
 *   Create and add jobs to queues
 */

const Queue = require("bull");
const REDIS_URL = require("../../config/config").redisURL;
const { sendEmailsProcess } = require("./sendEmailsProcess");

const sendEmailsQueue = new Queue("sendEmails", REDIS_URL);

sendEmailsQueue.process(async job => {
  await sendEmailsProcess(job.data);
});

sendEmailsQueue.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

module.exports = { sendEmailsQueue };
