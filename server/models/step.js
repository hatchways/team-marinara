const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepSchema = new Schema({
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
  prospects: [
    {
      prospect: {
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
      }
    }
  ]
});

module.exports = mongoose.model("Step", StepSchema);
