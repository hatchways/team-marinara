const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const randToken = require("rand-token");

const CampaignSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true },
  ownedBy: { type: Schema.Types.ObjectId, ref: "User", index: true },
  prospects: [
    {
      _id: false,
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
      },
      step: { type: Schema.Types.ObjectId, ref: "Step" },
      gmailLabelId: { type: String }
    }
  ],
  // stepsSummary are sums of campaign.steps.summary
  stepsSummary: {
    sent: { type: Number, default: 0, required: true },
    delivered: { type: Number, default: 0, required: true },
    opened: { type: Number, default: 0, required: true },
    clicked: { type: Number, default: 0, required: true },
    replied: { type: Number, default: 0, required: true },
    bounced: { type: Number, default: 0, required: true },
    optedOut: { type: Number, default: 0, required: true }
  },
  steps: [{ type: Schema.Types.ObjectId, ref: "Step", index: true }],
  gmailLabel: {
    // unique Label to add to all emails in campaign
    type: String,
    default: () => `mscId${randToken.generate(8)}`,
    required: true,
    index: true
  },
  gmailLabelId: { type: String } // id of above label from gmail
});

module.exports = mongoose.model("Campaign", CampaignSchema);
