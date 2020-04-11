const User = require("../models/user");
const Campaign = require("../models/campaign");

exports.validateCampaignInput = async data => {
  const errors = {};
  const { name, ownedBy } = data;

  if (!name) errors.name = "name is required";

  const userExists = await User.findById(ownedBy);
  if (!userExists) errors.ownedBy = "not owned by a valid user";

  return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
};

exports.validateAddProspectsInput = (campaignId, prospectIds) => {
  // check for prospoects already in the campaign
  const uniqueProspects = [];

  prospectIds.forEach(async prospectId => {
    const prospectExists = await Campaign.findOne({
      _id: campaignId,
      "prospects.prospectId": prospectId
    });
    if (!prospectExists) uniqueProspects.push(prospectId);
  });

  return uniqueProspects;
};
