const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String },
  content: { type: String },
  created: { type: Date, default: Date.now, required: true },
  prospects: [
    {
      _id: false,
      prospectId: {
        type: Schema.Types.ObjectId,
        ref: "Prospect",
        required: true,
        index: true
      },
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
      gmailMessageId: { type: String },
      gmailThreadId: { type: String }
    }
  ],
  summary: {
    sent: { type: Number, default: 0, required: true },
    delivered: { type: Number, default: 0, required: true },
    opened: { type: Number, default: 0, required: true },
    clicked: { type: Number, default: 0, required: true },
    replied: { type: Number, default: 0, required: true },
    bounced: { type: Number, default: 0, required: true },
    optedOut: { type: Number, default: 0, required: true }
  }
});

module.exports = mongoose.model("Step", StepSchema);
