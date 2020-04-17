const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariableSchema = new Schema({
  _id: false,
  variableName: { type: String, required: true },
  collectionName: { type: String, required: true },
  fieldName: { type: String, required: true }
});

module.exports = mongoose.model("Variable", VariableSchema);
