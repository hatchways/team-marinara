const express = require("express");
const router = express.Router();
const prospectRouter = require("./api/prospects");


router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.use("/api/prospects", prospectRouter);

module.exports = router;
