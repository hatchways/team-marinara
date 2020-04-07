const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const {validateProspectInput, validateFile} = require("../../validation/prospect");
const Prospect = require("../../models/Prospect");
const { processCsvData } = require("../../utils/csv/csvProcess")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../server/tmp/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, 'csv-upload' + '-' + Date.now())
  }
});
const upload = multer({ storage: storage })

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
          return res.status(400).json({ email: "Prospect with this email address already exists" });
        } else {
          if(req.body.ownedBy !== null && !mongoose.Types.ObjectId.isValid(req.body.ownedBy)){
            return res.status(400).json({ ownedBy: "Invalid user id provided for ownedBy"});
          }
          const {firstName, lastName, email, ownedBy, status} = req.body;
          const newProspect = new Prospect({firstName, lastName, email, ownedBy, status});
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

// @route GET /api/prospects?userId=xxxx
// @desc Get a List of Prospect objects for a User
// @access Authenticated Users
router.get("/", async function (req, res)  {
  let ownedById = req.query.ownedBy;
  let results;

  if(mongoose.Types.ObjectId.isValid(ownedById)) {
    ownedById = mongoose.Types.ObjectId(ownedById);
    results = await Prospect.find({ownedBy: ownedById});
  }
  res.status(200).send(results);
});

// @route PUT /api/prospects/{id}
// @desc Update a Prospect object
// @access Authenticated Users
router.put("/:id", async (req, res) => {
  let id = req.params.id;

  const { errors, isValid } = validateProspectInput(req.body); 
  const {firstName, lastName, email, ownedBy, status, lastContacted} = req.body;

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
        
        prospect.firstName = firstName;
        prospect.lastName = lastName;
        prospect.lastContacted = lastContacted;
        prospect.ownedBy = ownedBy;
        prospect.status = status;
        prospect.email = email;

          prospect
            .save()
            .then(prospect => {
              res.json(prospect);
            })
            .catch(err => console.log(err));
      }
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

// @route POST /api/prospects/upload
// @desc Upload Prospects with a csv file
// @access Authenticated Users
router.post("/upload", upload.single('file'), (req, res) => {
  const csvData = [];
  const file = req.file;

  const { errors, isValid } = validateFile(file);
  if(!isValid) {
      return res.status(400).send(errors);
  }

  fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => {
        csvData.push(row);
      })
      .on("end",  async () => {
        fs.unlinkSync(file.path);
        try{
          const count = await processCsvData(csvData);
          res.status(200).send(count);
        } catch(err){
          const error = {
            success : false,
            message : "CSV failed to upload",
            details : err.message
          }
          res.status(400).send(error);
        }
      })
      .on('error', function(err) {
          console.log(err);
          res.status(400).send(err);
      });
});

module.exports = router;
