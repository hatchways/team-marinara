const express = require("express");
const router = express.Router();
const prospectRouter = require("./api/prospects");

const gmailAuth = require("./api/gmail-auth");

router.get("/", (req, res, next) => {
  res.status(200).send("Home Page");
});

router.use("/api/prospects", prospectRouter);
router.use("/api/gmail-auth", gmailAuth);

module.exports = router;
