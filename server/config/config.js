const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost",
  mongoPort: process.env.MONGO_PORT || "27017",
  mongoDB: process.env.MONGO_DB || "mail-sender-dev",
  appSecret: process.env.APP_SECRET || "secret",
  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET ||
    require("./gmail-secret.json").client_secret,
  googleClientId:
    process.env.GOOGLE_CLIENT_ID || require("./gmail-secret.json").client_id
};

module.exports = config;
