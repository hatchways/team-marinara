const mongoose = require("mongoose");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const { validateProspectInput } = require("../../validation/prospect");
const Prospect = require("../../models/Prospect");

async function processCsvData(data, userId) {
  let skippedCount = 0;
  let successCount = 0;
  let uploadArray = [];

  let emailsFromCsv = data
    .filter(data => validateProspectInput(data).isValid)
    .map(data => data.email);
  emailsFromCsv = new Set(emailsFromCsv);

  let dbEmails = await Prospect.find({ ownedBy: userId }, { email: 1, _id: 0 });
  dbEmails = dbEmails.map(dbEmails => dbEmails.email);
  dbEmails = new Set(dbEmails);

  for (let email of emailsFromCsv) {
    if (dbEmails.has(email)) {
      emailsFromCsv.delete(email);
    }
  }

  for (let i = 0; i < data.length; i++) {
    const prospect = data[i];
    prospect.ownedBy = userId;
    const { firstName, lastName, email, ownedBy, status } = prospect;
    if (emailsFromCsv.has(data[i].email)) {
      let newProspect;
      if (mongoose.Types.ObjectId.isValid(userId)) {
        prospect.ownedBy = mongoose.Types.ObjectId(userId);
        newProspect = new Prospect({
          firstName,
          lastName,
          email,
          ownedBy,
          status
        });
      } else {
        newProspect = new Prospect({ firstName, lastName, email, status });
      }
      uploadArray.push(newProspect);
      emailsFromCsv.delete(data[i].email);
    }
  }

  if (uploadArray.length !== 0) {
    try {
      await Prospect.insertMany(uploadArray);
    } catch (err) {
      throw new Error(err);
    }
  }
  successCount = uploadArray.length;
  skippedCount = data.length - successCount;

  return {
    successCount,
    skippedCount
  };
}

module.exports = { processCsvData };
