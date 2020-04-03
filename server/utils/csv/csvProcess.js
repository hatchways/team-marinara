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
      //Right now, not logging errors as discussed in standup, just counting skipped entries
      const { errors, isValid } = validateProspectInput(prospect);
      if(errors.ownedBy !== null) {
        //csv default value is empty string which causes mongoose objectId cast error
        prospect.ownedBy = null; 
      }
      const {firstName, lastName, email, ownedBy, status} = prospect;

      if(!isValid) {
        skippedCount++;
      } else {
        await Prospect.findOne({ email: email }).then(prospectFound => {
            if (prospectFound) {
                skippedCount++;
            } else {
                successCount++;
                var created = new Date();
                const newProspect = new Prospect({firstName, lastName, email, ownedBy, created, status});
                uploadArray.push(newProspect);
            }
        });
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