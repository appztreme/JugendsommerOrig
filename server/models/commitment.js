'use strict';
const db = require('../db');
let mongoose = require('mongoose');

const commitmentSchema = db.Schema({
	name: { type: String, required: true },
	index: { type: Number },
	description: { type: String, required: false },
	date: { type: Date, required: false },
	type: { type: String, enum: ['food', 'business', 'travel'], required: true, default: 'business'},
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
	isPaymentDone: { type: Boolean, required: true, default: false },
	isPaymentJDDone: { type: Boolean, required: true, default: false },
  isInvoice: { type: Boolean, required: true, default: false },
	isCleared: { type: Boolean, required: true, default: false },
});

var Commitment = db.model('Commitment', commitmentSchema);

commitmentSchema.pre('save', function(next) {
  var com = this;
	if(!com.index > 0) {
		console.log("no index found");
		Commitment.findOne()
    	.sort({index: -1})
    	.exec(function(err, doc)
    	{
        var max = (doc && doc.index) ? doc.index : 0;
        com.index = max + 1;
				console.log("new index is:", com.index);
				next();
    	});
	} else {
		console.log("index found", com.index);
		next();
	}
});

module.exports = Commitment;
