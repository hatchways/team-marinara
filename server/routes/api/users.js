const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../../models/user");
const secret = require("../../config/config").secretOrKey;

const {
  validateRegisterInput,
  validateLoginInput
} = require("../../validation/users");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    //Validation passed
    const { firstName, lastName, email, password } = req.body;

    //Check for existing user
    User.findOne({ email }).then(user => {
      if (user) {
        errors.msg = "Email is already registered";
        res.status(400).json(errors);
      } else {
        const newUser = new User({ firstName, lastName, email, password });

        //Salt and hash password
        bcrypt
          .hash(password, 10)
          .then(hash => {
            newUser.password = hash;
          })
          .then(() => newUser.save())
          .then(user => {
            jwt.sign({ id: user._id }, secret, (err, token) => {
              res.json({ token });
            });
          });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    //Validation passed
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
      if (!user) {
        errors.msg = "Email or password is incorrect";
        res.status(400).json(errors);
      } else {
        //Compare password with hash
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            errors.msg = "Email or password is incorrect";
            res.status(400).json(errors);
          } else {
            jwt.sign({ id: user._id }, secret, (err, token) => {
              res.json({ token });
            });
          }
        });
      }
    });
  }
});

module.exports = router;
