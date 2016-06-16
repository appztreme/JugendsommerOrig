var db = require('../db');
var mongoose = require('mongoose');

var lendingSchema = db.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
  date: { type: Date, required: true }
});

var Lending = db.model('Lending', lendingSchema);

module.exports = Lending;
