const express = require("express");
const router = express.Router();
const gmailAuth = require("./gmail-auth");

router.get("/", (req, res, next) => {
  res.status(200).send("Home Page");
});
router.get("/api/gmail-auth", gmailAuth.checkForToken);
router.get("/api/gmail-auth/success", gmailAuth.processToken);

module.exports = router;
