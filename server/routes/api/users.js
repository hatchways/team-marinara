const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../../models/user");
const secret = require("../../config/config").appSecret;

const {
  validateRegisterInput,
  validateLoginInput,
  validateUserInput,
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
              res.status(201).json({ token });
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

// @route GET /api/users/{id}
// @desc Get a User object
// @access
router.get("/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    if (!user) {
      res.status(404).send({ id: `User with id ${id} is not found` });
    } else {
      res.json(user);
    }
  });
});

// @route PUT /api/users/{id}
// @desc Update a User object
// @access Authenticated Users
router.put("/:id", (req, res) => {
  let id = req.params.id;

  // TO DO *****************
  const { errors, isValid } = validateUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findById(id, function(err, user) {
    if (!user) {
      res.status(404).send({ id: `User with id ${id} is not found` });
    } else {
      //if updating email field, check if User with new email alredy exists
      if (req.body.email !== user.email) {
        User.findOne({ email: req.body.email }).then(userEmailCheck => {
          if (userEmailCheck) {
            return res.status(400).json({
              email:
                "Cannot update email address. Email address already exists",
            });
          }
        });
      }
      user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
      user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
      user.email = req.body.email ? req.body.email : user.email;

      user
        .save()
        .then(user => {
          res.json(user);
        })
        .catch(err => console.log(err));
    }
  });
});

// @route DELETE /api/users/{id}
// @desc Delete a User object
// @access Authenticated Users
router.delete("/:id", (req, res) => {
  let id = req.params.id;

  user = User.findOneAndDelete({ _id: id }, function(err, removeResult) {
    if (err) {
      res.status(400).send(err);
    }
    if (!removeResult) {
      res.status(404).send({ id: `User with id ${id} not found.` });
    } else {
      res.json({ id: id });
    }
  });
});

module.exports = router;
