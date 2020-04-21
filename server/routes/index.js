const express = require("express");
const router = express.Router();
const prospect = require("./api/prospects");
const gmailAuth = require("./api/gmail-auth");
const users = require("./api/users");
const campaigns = require("./api/campaigns");
const templates = require("./api/templates");
const notifications = require("./api/notifications");
const path = require("path");

router.use("/api/users", users);
router.use("/api/prospects", prospect);
router.use("/api/gmail-auth", gmailAuth);
router.use("/api/campaigns", campaigns);
router.use("/api/templates", templates);
router.use("/api/notifications", notifications);

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

module.exports = router;
