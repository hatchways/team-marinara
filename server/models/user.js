const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Placeholder User schema
const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gmail_token: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
