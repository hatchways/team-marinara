const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const STATUS = Object.freeze({
  OPEN: "open",
  CLOSED: "closed"
});

const ProspectSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    ownedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
      required: true
    },
    lastContacted: { type: Date, required: false },
    status: {
      type: String,
      enum: Object.values(STATUS)
    }
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

Object.assign(ProspectSchema.statics, {
  STATUS
});

(module.exports = mongoose.model("Prospect", ProspectSchema)), { STATUS };
