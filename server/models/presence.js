var db = require('../db');
var mongoose = require('mongoose');

var presenceSchema = db.Schema({
    registrationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true },
    date: { type: Date, required: true },
    isPresent: { type: Boolean, required: true, default: false }
});

var Presence = db.model('Presence', presenceSchema);

module.exports = Presence;