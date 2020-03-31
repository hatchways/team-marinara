const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var Status = Object.freeze({
    OPEN : 'open',
    CLOSED: 'closed'
});

/**
 * 
 * We will want to make the 'owned_by' field a required field once we have workable user_id's
 * 
 **/

const ProspectSchema = new Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, index: true},
    owned_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : false},
    created: {type: Date, required : true},
    last_contacted: {type: Date, required : false},
    status: {
        type: String,
        enum: Object.values(Status),
      }
});

Object.assign(ProspectSchema.statics, {
    Status,
});

module.exports = mongoose.model("Prospect", ProspectSchema), { Status };