var db = require('../db');
var mongoose = require('mongoose');

var Activity = db.model('Activity', {
	name: { type: String, required: true },
	name_it: { type: String, required: false },
	description: { type: String, required: true },
	description_it: { type: String, required: false },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
	maxParticipants: { type: Number, required: true },
    curParticipants: { type: Number, required: true, default: 0 },
    queueSize: { type: Number, required: true }
});

module.exports = Activity;
