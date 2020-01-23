'use strict';
const conn = require('./../db_shop');
const mongoose = require('mongoose');
const config = require('./../../config');
//let conn = mongoose.createConnection(config.shop_prod);

const articleSchema = new mongoose.Schema({
	code: { type: String, required: false },
	name: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	location: { type: String, required: true },
	maxLoanDuration: { type: Number, required: true, default: 1 },
	status: { type: String, enum: ['free', 'lent', 'blocked'], required: true, default: 'free'},
	isInSet: { type: Boolean, required: true, default: false },
	isSet: { type: Boolean, required: true, default: false },
	articles: { type: Array, default: [] }
});

articleSchema.index({code: 1}, {unique: true});

// autogenerate code in format '<type>-00001'
articleSchema.pre('save', function(next) {
	let a = this;
	a.wasNew = a.isNew;
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
		Article.findById(a._id, function(errF, docF) {
			a.oldSubArticles = docF.articles;
			next();
		});
  	}
});

articleSchema.post('save', function(doc, next) {
	if(doc.wasNew) {
		let aids = doc.articles.map(a => mongoose.Types.ObjectId(a._id));
		console.log("was new", aids);
		Article.update({_id: {$in: aids}}, {$set: { status: 'blocked', isInSet: true }}, {multi: true}, function(err, res) {
			console.log("finish", err, res);
			next();
		});
	}
	else {
		let oldaids = doc.oldSubArticles.map(a => mongoose.Types.ObjectId(a._id));
		let newaids = doc.articles.map(a => mongoose.Types.ObjectId(a._id));
		Article.update({_id: {$in: oldaids}}, {$set: { status: 'free', isInSet: false}}, {multi: true}, function(err, res) {
			Article.update({_id: {$in: newaids}}, {$set: {status: 'blocked', isInSet: true}}, {multi: true}, function(err2, res2) {
				console.log("updated", err, err2, res, res2);
				next();
			})
		});
	}
})

const Article = conn.model('Article', articleSchema);

module.exports = Article;
