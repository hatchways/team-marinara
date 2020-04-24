const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gmailToken: { type: String }, // token for accessing user's gmail account
  gmailHistoryId: { type: String } // historyId of mailsender's last sync with user's gmail account
});

module.exports = mongoose.model("User", UserSchema);
