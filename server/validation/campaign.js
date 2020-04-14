exports.validateCampaignInput = data => {
  const errors = {};
  const { name } = data;
  if (!name) errors.name = "name is required";

  return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
};

exports.validateStepInput = data => {
  const errors = {};
  const { name } = data;
  if (!name) errors.name = "name is required";

  return {
    errors,
    isValid: !Object.keys(errors).length > 0
  };
};
