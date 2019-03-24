'use strict';
const db = require('../db');
let mongoose = require('mongoose');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear+"-1-1");

const commitmentSchema = db.Schema({
	name: { type: String, required: true },
	index: { type: Number },
	description: { type: String, required: false },
	rnumber: { type: String, required: false },
	date: { type: Date, required: false },
	type: { type: String, enum: ['food', 'business', 'travel'], required: true, default: 'business'},
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
	activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: false },
	isPaymentDone: { type: Boolean, required: true, default: false },
	isPaymentJDDone: { type: Boolean, required: true, default: false },
  isInvoice: { type: Boolean, required: true, default: false },
	isCleared: { type: Boolean, required: true, default: false },
});

commitmentSchema.pre('save', function(next) {
  var com = this;
	if(!com.index || !com.index > 0) {
	Commitment.findOne({date: {$gte: startCurYear}})
    	.sort({index: -1})
    	.exec(function(err, doc)
    	{
        	var max = (doc && doc.index) ? doc.index : 0;
        	com.index = max + 1;
			next();
    	});
	} else {
		next();
	}
});

var Commitment = db.model('Commitment', commitmentSchema);

module.exports = Commitment;
