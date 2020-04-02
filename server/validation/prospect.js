const Validator = require("validator");

const { STATUS } = require("../models/Prospect")

module.exports = function validateProspectInput(data) {
  const errors = {};

// Name checks
  if (!data.firstName) {
    errors.firstName = "First name is required";
  }
  if (!data.lastName) {
    errors.lastName = "Last name is required";
  }
  
// Email checks
  if (!data.email) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Status checks  
if (!data.status) {
    errors.status = "Status is required";
} else if (!Object.values(STATUS).includes(data.status)) {
    errors.status = "Invalid Prospect status";
}

return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
};