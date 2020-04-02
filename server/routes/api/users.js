const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../../validation/users");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    console.log(req.body);
    res.send("Registration successful");
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  res.send("login attempted");
});

module.exports = router;
