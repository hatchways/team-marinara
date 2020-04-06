const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true },
  prospects: [{ type: Schema.Types.ObjectId, ref: "Prospect", index: true }],
  steps: [
    {
      name: { type: String, required: true },
      type: {
        type: String,
        required: true,
        enum: ["New thread", "Follow up"],
        default: "New thread"
      },
      subject: { type: String },
      content: { type: String },
      created: { type: Date, default: Date.now, required: true },
      stepDetail: {
        type: Schema.Types.ObjectId,
        ref: "StepDetail",
        index: true
      }
    }
  ]
});

module.exports = mongoose.model("Campaign", CampaignSchema);
