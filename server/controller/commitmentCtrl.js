'use strict';
const Commitment = require('./../models/commitment');
const Event = require('./../models/event');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear-1,12,31);

exports.find = (req, res, next) => {
	Commitment.find()
		.where('date').gte(startCurYear)
		.populate('eventId')
		.populate('userId')
		.sort({ eventId: 1, date: 1})
		.exec(function(err, coms) {
			if(err) { return next(err); }
			res.json(coms);
		});
};

exports.findById = (req, res, next) => {
	Commitment.findById(req.params.commitmentId, (err, commitment) => {
		if(err) { return next(err); }
		res.json(commitment);
	});
};

exports.findByUserId = (req, res, next) => {
	Commitment.find()
		.where('date').gte(startCurYear)
		.where('userId').equals(req.params.userId)
		.populate('eventId')
		.populate('userId')
		.sort({ eventId: 1, date: 1})
		.exec(function(err, coms) {
			if(err) { return next(err); }
			res.json(coms);
		});
};

exports.findByEventId = (req, res, next) => {
	Commitment.find()
		.where('date').gte(startCurYear)
		.where('eventId').equals(req.params.eventId)
		.populate('eventId')
		.populate('userId')
		.sort({ eventId: 1, date: 1 })
		.exec(function(err, coms) {
			if(err) { return next(err); }
			res.json(coms);
		});
};

exports.create = (req, res, next) => {
	var commitment = new Commitment({
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		type: req.body.type,
		amount: req.body.amount,
		eventId: req.body.eventId,
		userId: req.body.userId,
		isPaymentDone: req.body.isPaymentDone,
		isPaymentJDDone: req.body.isPaymentJDDone,
		isInvoice: req.body.isInvoice,
		isCleared: (req.body.isPaymentJDDone) ? true : req.body.isCleared,
	});
	commitment.save((err, com) => {
		if(err) { console.log(err); return next(err); }
		res.status(201).json(com);
	});
};

exports.update = (req, res, next) => {
	Commitment.findById(req.body._id, (err, com) => {
		if(!com) return next(new Error('Keine Rechnung im System mit id ' + req.body._id));
		com.name = req.body.name;
		com.description = req.body.description;
		com.date = req.body.date;
		com.type = req.body.type;
		com.amount = req.body.amount;
		com.eventId = req.body.eventId;
		//com.userId = req.body.userId; // do not change initial user
		com.isPaymentDone = req.body.isPaymentDone;
		com.isPaymentJDDone = req.body.isPaymentJDDone;
		com.isInvoice = req.body.isInvoice;
		com.isCleared = req.body.isCleared;
		com.save(function(err, comDb) {
			if(err) { return next(err); }
			res.status(201).json(comDb);
		});
	});
};

exports.delete = (req, res, next) => {
	Commitment.findByIdAndRemove(req.params.commitmentId, (err, reg) => {
		if(err) { return next(err); }
		res.status(200).json(reg);
	});
};

exports.getSelectableEvents = (req, res, next) => {
		Event.find()
			.where('startDate').gte(startCurYear)
			.select('_id location name')
      .sort({'eventId.location': 1})
			.exec(function(err, evs) {
				if(err) { return next(err); }
				res.json(evs);
			});
};

exports.getSummary = (req, res, next) => {
		Commitment.aggregate([
				{ $match:
					{ date: { $gte: startCurYear } }
				},
				{ $group:
				{ _id:
					{
						eventId: "$eventId",
						type: "$type",
						isPaymentDone: "$isPaymentDone",
	          isInvoice: "$isInvoice",
	          isCleared: "$isCleared",
					},
		 		sum: { $sum: "$amount" }
				}
			},
			{ $group:
				{ _id: "$_id.eventId",
					sumFood:     { $max: {$cond: [ { $eq: ['$_id.type', 'food'    ] }, '$sum', 0]} },
					sumBusiness: { $max: {$cond: [ { $eq: ['$_id.type', 'business'] }, '$sum', 0]} },
					sumTravel:   { $max: {$cond: [ { $eq: ['$_id.type', 'travel'  ] }, '$sum', 0]} },
					sumPaymentOpen: { $max: {$cond: [ {$and: [ { $eq: ['$_id.isPaymentDone', true] }, { $eq: ['$_id.isCleared', false] }, ]}, '$sum', 0 ]} },
					sumInvoiceOpen: { $max: {$cond: [ {$and: [ { $eq: ['$_id.isInvoice', true] }, { $eq: ['$_id.isCleared', false] }, ]}, '$sum', 0 ]} },
				}
			}
		], function(err, ag) {
			if(err) { return next(err); }
			Event.populate(ag, {path: "_id"}, function(err2, ag2) {
						if(err2) { return next(err2); }
						res.json(ag2);
				});
		});
};
