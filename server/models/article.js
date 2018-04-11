'use strict';
//const db = require('./../db_shop');
const mongoose = require('mongoose');
const config = require('./../../config');
let conn = mongoose.createConnection(config.shop_prod);

const articleSchema = new mongoose.Schema({
	code: { type: String, required: false },
	name: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	location: { type: String, required: true },
	maxLoanDuration: { type: Number, required: true, default: 1 },
	status: { type: String, enum: ['free', 'lent', 'blocked'], required: true, default: 'free'},
});

articleSchema.index({code: 1}, {unique: true});

// autogenerate code in format '<type>-00001'
articleSchema.pre('save', function(next) {
	let a = this;
  	if(a.isNew) {
		Article.find({type: a.type})
				.sort({ code: -1 })
				.limit(1)
				.exec((err, docs) => {
				   if(err) next(err);
				   let highestCode = 0;
				   if(docs && docs[0] && docs[0].code) {
					   highestCode = Number.parseInt(docs[0].code.replace(`${a.type}-`, ''));
				   }
				   let seq = '00000' + (highestCode + 1);
				   a.code = `${a.type}-${(seq).substring(seq.length - 6)}`;
				   next();
			   });
  	} else {
    	next();
  	}
});

const Article = conn.model('Article', articleSchema);

module.exports = Article;