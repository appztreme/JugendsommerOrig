'use strict';
const Commitment = require('./../models/commitment');
const Event = require('./../models/event');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

const getCommitmentsAll = (res) => {
	Commitment.find()
		.where('date').gte(startCurYear)
		.populate('eventId')
		.sort({ eventId: 1, date: 1})
		.exec(function(err, coms) {
			if(err) { return next(err); }
			res.json(coms);
		});
};

const getCommitmentsByEventId = (eventId, res)  =>{
	Commitment.find()
		.where('date').gte(startCurYear)
		.where('eventId').equals(eventId)
		.populate('eventId')
		.sort({ eventId: 1, date: 1 })
		.exec(function(err, coms) {
			if(err) { return next(err); }
			res.json(coms);
		});
};

const getCommitmentsByUserId = (userId, res) => {
	Commitment.find()
		.where('date').gte(startCurYear)
		.where('userId').equals(userId)
		.populate('eventId')
		.sort({ eventId: 1, date: 1})
		exec(function(err, coms) {
			if(err) { return next(err); }
			res.json(coms);
		});
};

exports.find = (req, res, next) => {
	if(!req.query.eventId && !req.query.userId)
		return getCommitmentsAll(res);
	else {
		if(req.query.eventId)
			return getCommitmentsByEventId(req.query.eventId, res);
		else(req.query.userId)
			return getCommitmentsByUserId(req.query.userId, res);
	}
};

exports.findById = (req, res, next) => {
	Commitment.findById(req.params.commitmentId, (err, commitment) => {
		if(err) { return next(err); }
		res.json(commitment);
	});
};

exports.create = (req, res, next) => {
	var commitment = new Commitment({
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		amount: req.body.amount,
		eventId: req.body.eventId,
		userId: req.body.userId,
		isPaymentDone: req.body.isPaymentDone,
		isPaymentJDDone: req.body.isPaymentJDDone,
		isInvoice: req.body.isInvoice
	});
	commitment.save((err, com) => {
		if(err) { return next(err); }
		res.status(201).json(com);
	});
};

exports.update = (req, res, next) => {
	Commitment.findById(req.body._id, (err, com) => {
		if(!com) return next(new Error('Keine Rechnung im System mit id ' + req.body._id));
		com.name = req.body.name;
		com.description = req.body.description;
		com.date = req.body.date;
		com.amount = req.body.amount;
		com.eventId = req.body.eventId;
		com.userId = req.body.userId;
		com.isPaymentDone = req.body.isPaymentDone;
		com.isPaymentJDDone = req.body.isPaymentJDDone;
		com.isInvoice = req.body.isInvoice;
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
			.select('_id name')
      .sort({'eventId.location': 1})
			.exec(function(err, evs) {
				if(err) { return next(err); }
				res.json(evs);
			});
}
