const express = require("express");
const router = express.Router();
const prospect = require("./api/prospects");
const gmailAuth = require("./api/gmail-auth");
const users = require("./api/users");
const campaigns = require("./api/campaigns");
const templates = require("./api/templates");

router.use("/api/users", users);
router.use("/api/prospects", prospect);
router.use("/api/gmail-auth", gmailAuth);
router.use("/api/campaigns", campaigns);
router.use("/api/templates", templates);

module.exports = router;
