const Validator = require("validator");

const { STATUS } = require("../models/Prospect");

function validateProspectInput(data) {
  const errors = {};
  const { firstName, lastName, ownedBy, email, status } = data;
  // Name checks
  if (!firstName) {
    errors.firstName = "First name is required";
  }
  if (!lastName) {
    errors.lastName = "Last name is required";
  }

  // Email checks
  if (!email) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  // Status checks
  if (!status) {
    errors.status = "Status is required";
  } else if (!Object.values(STATUS).includes(status)) {
    errors.status = "Invalid Prospect status";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
}

function validateFile(file) {
  const errors = {};

  if (!file) {
    errors.file = "No file uploaded";
    return {
      errors,
      isValid: false
    };
  }

  if (file.size > 1000000) {
    errors.size = "File size too large";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
}

module.exports = { validateProspectInput, validateFile };
