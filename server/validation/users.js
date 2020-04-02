const Validator = require("validator");

exports.validateRegisterInput = data => {
  const { firstName, lastName, email, password, password2 } = data;
  const errors = {};

  //Validate name fields
  if (!firstName) {
    errors.firstName = "First name is required";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  }

  //Validate email
  if (!email) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Invalid Email Address";
  }

  //Validate password
  if (!password) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters long";
  }

  //Validate password2
  if (!password2) {
    errors.password2 = "Please confirm your password";
  } else if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords do not match";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
};

exports.validateLoginInput = data => {
  const { email, password } = data;
  const errors = {};

  //Validate email
  if (!email) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Invalid Email Address";
  }

  //Validate password
  if (!password) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
};
