const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const validateProspectInput = require("../../validation/prospect");
const Prospect = require("../../models/Prospect");

// @route POST /api/prospects
// @desc Create a Prospect object
// @access Authenticated Users
router.post("/", (req, res) => {
  //Prospect field validation
  const { errors, isValid } = validateProspectInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Prospect.findOne({ email: req.body.email }).then(prospect => {
    if (prospect) {
      return res
        .status(400)
        .json({ email: "Prospect with this email address already exists" });
    } else {
      var dateVar = new Date();
      if (
        req.body.ownedBy !== null &&
        !mongoose.Types.ObjectId.isValid(req.body.ownedBy)
      ) {
        return res
          .status(400)
          .json({ ownedBy: "Invalid user id provided for ownedBy" });
      }
      const newProspect = new Prospect({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        ownedBy: req.body.ownedBy,
        created: dateVar,
        status: req.body.status
      });
      newProspect
        .save()
        .then(prospect => res.json(prospect))
        .catch(err => console.log(err));
    }
  });
});

// @route GET /api/prospects/{id}
// @desc Get a Prospect object
// @access Authenticated Users
router.get("/:id", (req, res) => {
  let id = req.params.id;
  Prospect.findById(id, function(err, prospect) {
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
router.put("/:id", async (req, res) => {
  let id = req.params.id;

  const { errors, isValid } = validateProspectInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    await Prospect.findById(id, async function(err, prospect) {
      if (!prospect) {
        res.status(404).send({ id: `Prospect with id ${id} is not found` });
      } else {
        //if updating email field, check if Prospect with new email alredy exists
        if (req.body.email !== prospect.email) {
          const emailExists = await Prospect.findOne({
            email: req.body.email
          });
          if (emailExists) {
            return res.status(400).json({
              email: "Cannot update email address. Email address already exists"
            });
          }
        }

        prospect.firstName = req.body.firstName;
        prospect.lastName = req.body.lastName;
        prospect.lastContacted = req.body.lastContacted;
        prospect.ownedBy = req.body.ownedBy;
        prospect.status = req.body.status;
        prospect.email = req.body.email;

        prospect
          .save()
          .then(prospect => {
            res.json(prospect);
          })
          .catch(err => console.log(err));
      }
    });
  } catch (error) {
    console.log("Error editing prospect: ", error);
    res.status(500).send({ error: error });
  }
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
