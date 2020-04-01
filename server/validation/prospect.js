const Validator = require("validator");

const { STATUS } = require("../models/Prospect")

module.exports = function validateProspectInput(data) {
  const errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.firstName = (!data.firstName) ? "" : data.firstName;
  data.lastName = (!data.lastName) ? "" : data.lastName;
  data.email = (!data.email) ?  "" : data.email;
  data.status = (!data.status) ? "" : data.status;
// Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }
  
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Status checks  
if (!Object.values(STATUS).includes(data.status)) {
    errors.status = "Invalid Prospect status";
}

return {
    errors,
    isValid: (!Object.keys(errors).length > 0)
  };
};