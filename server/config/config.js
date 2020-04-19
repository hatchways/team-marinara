const config = {
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb+srv://umbauk:lasgdar82@cluster0-trix2.gcp.mongodb.net/mail-sender-dev?retryWrites=true&w=majority", //"mongodb://localhost:27017/mail-sender-dev",
  appSecret: process.env.APP_SECRET || "secret",
  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET ||
    require("./gmail-secret.json").client_secret,
  googleClientId:
    process.env.GOOGLE_CLIENT_ID || require("./gmail-secret.json").client_id,
  tmpDir: process.env.TMP_DIR || "../server/tmp/uploads"
};

module.exports = config;
