const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../../models/user");
const secret = require("../../config/config").appSecret;

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../validation/users");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    //Validation passed
    const { firstName, lastName, email, password } = req.body;

    //Check for existing user
    User.findOne({ email }).then((user) => {
      if (user) {
        errors.msg = "Email is already registered";
        res.status(400).json(errors);
      } else {
        const newUser = new User({ firstName, lastName, email, password });

        //Salt and hash password
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            newUser.password = hash;
          })
          .then(() => newUser.save())
          .then((user) => {
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

    User.findOne({ email }).then((user) => {
      if (!user) {
        errors.msg = "Email or password is incorrect";
        res.status(400).json(errors);
      } else {
        //Compare password with hash
        bcrypt.compare(password, user.password).then((isMatch) => {
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
  User.findById(id, function(err, prospect) {
    if (!prospect) {
      res.status(404).send({ id: `Prospect with id ${id} is not found` });
    } else {
      res.json(prospect);
    }
  });
});

// @route PUT /api/prospects/{id}
// @desc Update a Prospect object
// @access Authenticated Users
router.put("/:id", (req, res) => {
  let id = req.params.id;

  const { errors, isValid } = validateProspectInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Prospect.findById(id, function(err, prospect) {
    if (!prospect) {
      res.status(404).send({ id: `Prospect with id ${id} is not found` });
    } else {
      //if updating email field, check if Prospect with new email alredy exists
      if (req.body.email !== prospect.email) {
        Prospect.findOne({ email: req.body.email }).then(
          (prospectEmailCheck) => {
            if (prospectEmailCheck) {
              return res
                .status(400)
                .json({
                  email:
                    "Cannot update email address. Email address already exists",
                });
            }
          }
        );
      }
      prospect.firstName = req.body.firstName;
      prospect.lastName = req.body.lastName;
      prospect.lastContacted = req.body.lastContacted;
      prospect.ownedBy = req.body.ownedBy;
      prospect.status = req.body.status;
      prospect.email = req.body.email;

      prospect
        .save()
        .then((prospect) => {
          res.json(prospect);
        })
        .catch((err) => console.log(err));
    }
  });
});

// @route DELETE /api/prospects/{id}
// @desc Delete a Prospect object
// @access Authenticated Users
router.delete("/:id", (req, res) => {
  let id = req.params.id;

  prospect = Prospect.findOneAndDelete({ _id: id }, function(
    err,
    removeResult
  ) {
    if (err) {
      res.status(400).send(err);
    }
    if (!removeResult) {
      res.status(404).send({ id: `Prospect with id ${id} not found.` });
    } else {
      res.json({ id: id });
    }
  });
});

module.exports = router;
