const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariableSchema = new Schema({
  "first name": {
    collection: { type: String, required: true },
    field: { type: String, required: true }
  },
  "last name": {
    collection: { type: String, required: true },
    field: { type: String, required: true }
  }
});

module.exports = mongoose.model("Variable", VariableSchema);
