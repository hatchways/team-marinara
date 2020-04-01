const express = require("express");
const router = express.Router();
const validator = require("validator");

router.post("/register", (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;
  const errors = {};

  //Validate name fields
  if (validator.isEmpty(firstName)) {
    errors.firstName = "First name is required";
  }

  if (validator.isEmpty(lastName)) {
    errors.lastName = "Last name is required";
  }

  //Validate email
  if (validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Invalid Email Address";
  }

  //Validate password
  if (validator.isEmpty(password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters long";
  }

  //Validate password2
  if (validator.isEmpty(password2)) {
    errors.password2 = "Please confirm your password";
  } else if (!validator.equals(password, password2)) {
    errors.password2 = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
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
