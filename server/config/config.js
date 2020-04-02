const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost",
  mongoPort: process.env.MONGO_PORT || "27017",
  mongoDB: process.env.MONGO_DB || "mail-sender-dev",
  appSecret: process.env.APP_SECRET || "secret"
};

module.exports = config;
