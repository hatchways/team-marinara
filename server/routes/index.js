const express = require("express");
const router = express.Router();
const gmailAuth = require("./api/gmail-auth");

router.get("/", (req, res, next) => {
  res.status(200).send("Home Page");
});

router.use("/api/gmail-auth", gmailAuth);

module.exports = router;
