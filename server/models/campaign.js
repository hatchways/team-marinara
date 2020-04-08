const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true },
  ownedBy: { type: Schema.Types.ObjectId, ref: "User", index: true },
  prospects: [
    {
      prospectId: { type: Schema.Types.ObjectId, ref: "Prospect", index: true },
      status: {
        type: String,
        required: true,
        enum: [
          "Draft",
          "Sent",
          "Delivered",
          "Opened",
          "Clicked",
          "Replied",
          "Bounced",
          "Opted out"
        ],
        default: "Draft"
      }
    }
  ],
  // stepsSummary are counts of campaign.steps.prospects.status
  stepsSummary: {
    sent: { type: Number, default: 0, required: true },
    delivered: { type: Number, default: 0, required: true },
    opened: { type: Number, default: 0, required: true },
    clicked: { type: Number, default: 0, required: true },
    replied: { type: Number, default: 0, required: true },
    bounced: { type: Number, default: 0, required: true }
  },
  steps: [{ type: Schema.Types.ObjectId, ref: "Step", index: true }]
});

module.exports = mongoose.model("Campaign", CampaignSchema);
