const Validator = require("validator");
const isEmpty = require("is-empty");

const { Status } = require("../models/Prospect")

module.exports = function validateProspectInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.status = !isEmpty(data.status) ? data.status : "";

// Name checks
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Status checks  
if (!Object.values(Status).includes(data.status)) {
    errors.status = "Invalid Prospect status";
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};