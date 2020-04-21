const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gmailToken: { type: String }, // token for accessing user's gmail account
  gmailLabelId: { type: String } // labelId which will be applied to all email sent by MailSender on user's behalf
});

module.exports = mongoose.model("User", UserSchema);
