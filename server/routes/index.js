const express = require("express");
const router = express.Router();
const gmailAuth = require("./api/gmail-auth");
const users = require("./api/users");

router.use("/api/users", users);
router.use("/api/gmail-auth", gmailAuth);

module.exports = router;
