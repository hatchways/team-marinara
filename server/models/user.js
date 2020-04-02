const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Placeholder User schema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gmailToken: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
