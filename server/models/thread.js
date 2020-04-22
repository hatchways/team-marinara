const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  threadId: { type: String, required: true, index: true },
  stepId: {
    type: Schema.Types.ObjectId,
    ref: "Step",
    required: true
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  },
  prospectId: {
    type: Schema.Types.ObjectId,
    ref: "Prospect",
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Thread", ThreadSchema);
