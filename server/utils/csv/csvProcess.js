const mongoose = require("mongoose");
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const { validateProspectInput } = require("../../validation/prospect");
const Prospect = require("../../models/Prospect");

async function processCsvData(data) {
    let skippedCount = 0;
    let successCount = 0;
    let uploadArray = [];
    for(let i = 0; i < data.length; i++) {
      
      const prospect = data[i];
      const { errors, isValid } = validateProspectInput(prospect);

      const {firstName, lastName, email, ownedBy, status} = prospect;
      if(!isValid) {
        skippedCount++;
      } else {
        try{
            await Prospect.findOne({ email: email }).then(prospectFound => {
                if (prospectFound) {
                    skippedCount++;
                } else {
                    successCount++;
                    var created = new Date();
                    let newProspect = {};
                    if(mongoose.Types.ObjectId.isValid(prospect.ownedBy)) {
                        prospect.ownedBy = mongoose.Types.ObjectId(prospect.ownedBy);
                        newProspect = new Prospect({firstName, lastName, email, ownedBy, created, status});
                    } else {
                        newProspect = new Prospect({firstName, lastName, email, created, status});
                    }
                    uploadArray.push(newProspect);
                }
            });
        } catch(err) {
            throw new Error(err);
        }
      }
    }
    if(uploadArray.length !== 0) {
        Prospect.insertMany(uploadArray);
    }
    return {
      successCount,
      skippedCount
    };
  }

  module.exports = { processCsvData };