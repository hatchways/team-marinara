const User = require("../models/user");
const Campaign = require("../models/campaign");

exports.validateCampaignInput = async data => {
  const errors = {};
  const { name } = data;

  if (!name) errors.name = "name is required";

  return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
};
