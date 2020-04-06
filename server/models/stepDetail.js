const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepDetailSchema = new Schema({
  prospects: [
    {
      type: {
        type: String,
        required: true,
        enum: ["Email", "Call"],
        default: "Email"
      },
      prospect: { type: Schema.Types.ObjectId, required: true, index: true },
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
      subject: { type: String, required: true },
      content: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("StepDetail", StepDetailSchema);
