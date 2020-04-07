const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const STATUS = Object.freeze({
    OPEN : 'open',
    CLOSED: 'closed'
});

/**
 * 
 * We will want to make the 'ownedBy' field a required field once we have workable user_id's
 * 
 **/

const ProspectSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : false, index: true},
    lastContacted: {type: Date, required : false},
    status: {
        type: String,
        enum: Object.values(STATUS),
      }
},
{ timestamps: { createdAt: 'created', updatedAt: 'updated' } },);

Object.assign(ProspectSchema.statics, {
    STATUS,
});

module.exports = mongoose.model("Prospect", ProspectSchema), { STATUS };