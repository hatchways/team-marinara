const express = require("express");
const router = express.Router();
const prospect = require("./api/prospects");
const gmailAuth = require("./api/gmail-auth");
const users = require("./api/users");

router.use("/api/users", users);
router.use("/api/prospects", prospect);
router.use("/api/gmail-auth", gmailAuth);

module.exports = router;
