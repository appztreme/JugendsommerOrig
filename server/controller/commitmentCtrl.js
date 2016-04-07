'use strict';
const Commitment = require('./../models/commitment');

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
		userId: req.body.userId
	});
	commitment.save((err, com) => {
		if(err) { return next(err); }
		res.status(201).json(com);
	});
};
