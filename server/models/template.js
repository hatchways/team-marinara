const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    name: { type: String, required: true },
    created: { type: Date, default: Date.now, required: true },
    ownedBy: { type: Schema.Types.ObjectId, ref: "User", index: true },
    subject: { type: String, required: true },
    content: { type: Object, required: true },
    attachments : [
        {
            type: Buffer,
            required: false
        }
    ]
}, 
{ timestamps: { createdAt: 'created', updatedAt: 'updated' } },);

module.exports = mongoose.model("Template", TemplateSchema);