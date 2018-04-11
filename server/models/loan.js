'use strict';
//const db = require('./../db_shop');
const mongoose = require('mongoose');
const Article = require('./article');
const moment = require('moment');
const config = require('./../../config');
let conn = mongoose.createConnection(config.shop_prod);

const loanSchema = new mongoose.Schema({
	location: { type: String, required: true },
	lender: { type: String, required: true },
	phoneNumberLender: { type: String, required: true },
	from: { type: Date, required: true },
	to: { type: Date, required: true },
	article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
	isInSet: { type: Boolean, required: true, default: false }
});

// loanSchema.index({article: 1, from: 1}, {unique: true});

// adapt status of lent article
loanSchema.post('save', function(l) {
	if(moment(l.from).startOf('day').isSame(moment().startOf('day'))) {
		Article.findById(l.article)
        	.exec((err, doc) => {
            	doc.status = 'lent';
            	doc.save();
			});
	}
});

const Loan = conn.model('Loan', loanSchema);

module.exports = Loan;
