'use strict';
const db = require('../db');
let mongoose = require('mongoose');

const commitmentSchema = db.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, required: true, default: Date.now },
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
	isPaymentDone: { type: Boolean, required: true, default: false },
	isPaymentJDDone: { type: Boolean, required: true, default: false },
  isInvoice: { type: Boolean, required: true, default: false }
});

var Commitment = db.model('Commitment', commitmentSchema);

module.exports = Commitment;
