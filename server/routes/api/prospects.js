const express = require("express");
const router = express.Router();

// Load input validation
const validateProspectInput = require("../../validation/prospect");

// Load Prospect model
const Prospect = require("../../models/Prospect");

// @route POST /api/prospects
// @desc Create a Prospect object
// @access Authenticated Users
router.post("/", (req, res) => {
    
    //Object validation
    const { errors, isValid } = validateProspectInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Prospect.findOne({ email: req.body.email }).then(prospect => {
        if (prospect) {
          return res.status(400).json({ email: "Prospect with this email address already exists" });
        } else {
          var dateVar = new Date();
          const newProspect = new Prospect({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            owned_by: req.body.owned_by,
            created: dateVar,
            status: req.body.status,
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
router.get("/:id", (req, res) =>{
  
  let id = req.params.id;
  Prospect.findById(id, function(err, prospect) {
    if (!prospect) {
      res.status(404).send({id : `Prospect with id ${id} is not found`});  
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

  Prospect.findById(id, function(err, prospect) {
    if (!prospect) {
      res.status(404).send({id : `Prospect with id ${id} is not found`});  
    } else {
      //if updating email field, check if Prospect with new email alredy exists
      if(req.body.email!==prospect.email) {
        Prospect.findOne({ email: req.body.email }).then(prospect_email_check => {
          if (prospect_email_check) {
            return res.status(400).json({ email: "Cannot update email address. Email address already exists" });
          }
        });
      }
      prospect.first_name = req.body.first_name;
      prospect.last_name = req.body.last_name;
      prospect.last_contacted = req.body.last_contacted;
      prospect.owned_by = req.body.owned_by;
      prospect.status = req.body.status;
      prospect.email = req.body.email;

      prospect.save()
      .then(prospect => {res.json(prospect);})
      .catch(err => console.log(err));
    }
  });
})

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  prospect = Prospect.findOneAndDelete({_id: id}, function(err, removeResult) {
    if(err) {
      res.status(400).send(err);
    }
    console.log(removeResult);
    if(!removeResult) {
      console.log("none found");
      res.status(404).send({id:`Prospect with id ${id} not found.`})
    } else {
      res.json({id: id});
    }
  });
  
});

module.exports = router;