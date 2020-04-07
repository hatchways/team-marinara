const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/user");
const secret = require("../../config/config").appSecret;

const {
  validateRegisterInput,
  validateLoginInput,
  validateUserInput
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
              res.status(201).json({ token: token, userId: user._id });
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
              res.json({ token: token, userId: user._id });
            });
          }
        });
      }
    });
  }
});

// @route GET /api/users
// @desc Get user object of currently logged in user
// @access Authenticated User can get own record
router.get(
  "",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send({ id: `User with id ${userId} is not found` });
      } else {
        res.json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }
    } catch (error) {
      console.log("Error getting user: ", error);
      res.status(500).send({ error: error });
    }
  }
);

// @route PUT /api/users
// @desc Update the User object of the currently signed in user
// @access Authenticated User can edit own record
router.put(
  "",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;

    const { errors, isValid } = validateUserInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      let user = await User.findById(userId);
      if (!user) {
        res.status(404).send({ id: `User with id ${userId} is not found` });
      } else {
        //if updating email field, check if User with new email alredy exists
        if (req.body.email !== user.email) {
          const emailExists = await User.findOne({ email: req.body.email });
          if (emailExists) {
            return res.status(400).json({
              email: "Cannot update email address. Email address already exists"
            });
          }
        }

        user.firstName = req.body.firstName
          ? req.body.firstName
          : user.firstName;
        user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
        user.email = req.body.email ? req.body.email : user.email;
        // wipe the gmail token if user is changing email address
        user.gmailToken = req.body.email ? null : user.gmailToken;

        user
          .save()
          .then(user => {
            res.json({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            });
          })
          .catch(err => console.log(err));
      }
    } catch (error) {
      console.log("Error modifying user: ", error);
      res.status(500).send({ error: error });
    }
  }
);

module.exports = router;
