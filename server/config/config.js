const config = {
  mongoURI:
    process.env.MONGO_URI || "mongodb://localhost:27017/mail-sender-dev",
  appSecret: process.env.APP_SECRET || "secret",
  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET ||
    require("./gmail-secret.json").client_secret,
  googleClientId:
    process.env.GOOGLE_CLIENT_ID || require("./gmail-secret.json").client_id,
  googleRedirectUrl:
    process.env.GOOGLE_REDIRECT_URL ||
    require("./gmail-secret.json").redirect_uri,
  tmpDir: process.env.TMP_DIR || "../server/tmp/uploads",
  redisHost: process.env.REDIS_HOST || "127.0.0.1",
  redisPort: process.env.REDIS_PORT || "6379",
  redisAuth: process.env.REDIS_AUTH || "",
  mailSenderGmailLabelId: "mailsender.dev campaign"
};

module.exports = config;
