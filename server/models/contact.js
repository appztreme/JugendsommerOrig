const db = require('../db');
const mongoose = require('mongoose');

const contactSchema = db.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: false },
	phoneNumber: { type: String, required: false }
});

contactSchema.index({firstName: 1, lastName: 1}, {unique: true});

const Contact = db.model('Contact', contactSchema);

module.exports = Contact;