'use strict';
const Event = require('./../models/event');
const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.findByCurrentYear = (req, res, next) => {
	Event.find()
		.where('startDate').gte(startCurYear)
		.sort({ location: 1, startDate: 1 })
	  .exec(function(err, ev) {
			if(err) { return next(err); }
			res.json(ev);
	});
};

exports.findByEventId = (req, res, next) => {
	Event.findById(req.params.eventId, function(err, ev) {
		if(err) { return next(err); }
		res.json(ev);
	});
};

exports.create = (req, res, next) => {
	var ev = new Event({
		name: req.body.name,
		description: req.body.description,
		type: req.body.type,
		location: req.body.location,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		visibleFrom: req.body.visibleFrom,
		visibleTo: req.body.visibleTo,
		budgetFood: req.body.budgetFood,
		budgetBusiness: req.body.budgetBusiness,
	  info: req.body.info
	});
	ev.save(function(err, ev) {
		if(err) { return next(err); }
		res.status(201).json(ev);
	});
};

exports.delete = (req, res, next) => {
	Event.findByIdAndRemove(req.params.eventId, function(err, ev) {
		if(err) { return next(err); }
		res.status(200).json(ev);
	});
};

exports.update = (req, res, next) => {
	Event.findById(req.body._id, function(err, ev) {
		if(!ev) return next(new Error('Kein Event im System mit id ' + req.body._id));
		ev.name = req.body.name;
		ev.description = req.body.description;
		ev.type = req.body.type;
		ev.location = req.body.location;
		ev.startDate = req.body.startDate;
		ev.endDate = req.body.endDate;
		ev.visibleFrom = req.body.visibleFrom;
		ev.visibleTo = req.body.visibleTo;
		ev.budgetFood = req.body.budgetFood;
		ev.budgetBusiness = req.body.budgetBusiness;
		ev.info = req.body.info;

		ev.save(function(erre, eve) {
			if(erre) next(erre);
			res.status(201).json(eve);
		});
	});
};
