const { client_secret, client_id } = require("./gmail-secret.json");

const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost",
  mongoPort: process.env.MONGO_PORT || "27017",
  mongoDB: process.env.MONGO_DB || "mail-sender-dev",
  appSecret: process.env.APP_SECRET || "secret",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || client_secret,
  googleClientId: process.env.GOOGLE_CLIENT_ID || client_id
};

module.exports = config;
