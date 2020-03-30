let config = {};

config.mongoURI = process.env.MONGO_URI || "mongodb://localhost";
config.mongoPort = process.env.MONGO_PORT || "27017";
config.mongoDB = process.env.MONGO_DB || "mail-sender-dev";

module.exports = config;
