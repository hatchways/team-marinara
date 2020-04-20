/*
 *   Create and add jobs to queues
 */

const Queue = require("bull");
const { redisHost, redisPort, redisAuth } = require("../../config/config");
const { sendEmailsProcess } = require("./sendEmailsProcess");

const sendEmailsQueue = async (stepId, userId, gmailToken) => {
  try {
    // Create or connect to queue
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

    await sendEmailsQueue.add({
      stepId: stepId,
      userId: userId,
      gmailToken: gmailToken
    });

    sendEmailsQueue.on("completed", job => {
      console.log(`Job ${job.id} completed`);
    });
  } catch (error) {
    console.log("Error adding job to queue: ", error);
  }
};

module.exports = { sendEmailsQueue };
