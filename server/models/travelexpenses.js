'use strict';
const db = require('../db');
let mongoose = require('mongoose');

const travelExpensesSchema = db.Schema({
	firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  quantity: { type: Number, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
});

var TravelExpenses = db.model('TravelExpenses', travelExpensesSchema);

module.exports = TravelExpenses;
