const db = require('../db');
const mongoose = require('mongoose');

const Contact = db.model('Contact', {
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: false },
	phoneNumber: { type: String, required: false },
	eventId: { type: mongoose.Schema.ObjectId, ref: 'EventId', required: true },
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'ActivityId', required: false },
    type: { type: String, enum: ['Betreuer', 'Kontakt'], required: true, default: 'Betreuer'}
});

module.exports = Contact;