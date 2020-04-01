const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;
  console.log(req.body);
  res.send("register attempted");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  res.send("login attempted");
});

module.exports = router;
