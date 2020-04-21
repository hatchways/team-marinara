/*
 *   Create and add jobs to queues
 */

const Queue = require("bull");
const { redisHost, redisPort, redisAuth } = require("../../config/config");
const { sendEmailsProcess } = require("./sendEmailsProcess");

const sendEmailsQueue = new Queue("sendEmails", {
  redis: {
    port: redisPort,
    host: redisHost,
    password: redisAuth
  }
});

sendEmailsQueue.process(async job => {
  await sendEmailsProcess(job.data);
});

sendEmailsQueue.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

module.exports = { sendEmailsQueue };
