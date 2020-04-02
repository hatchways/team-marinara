const mongoose = require("mongoose");
const User = require("../models/user.js");
const config = require("../config.js");

async function main() {
  const mongoDB =
    config.mongoURI + ":" + config.mongoPort + "/" + config.mongoDB;
  mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to database...");
    });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  dummyUsers = [
    {
      firstName: "User",
      lastName: "One",
      email: "a@a.com",
      password: "password",
    },
    {
      firstName: "User",
      lastName: "Two",
      email: "b@b.com",
      password: "password",
    },
    {
      firstName: "User",
      lastName: "Three",
      email: "c@c.com",
      password: "password",
    },
  ];

  await db.collection("users").insertMany(dummyUsers);

  console.log("Dummy users added to users collection");

  process.exit(1);
}

main();
