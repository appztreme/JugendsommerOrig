'use strict';
const Event = require('./../models/event');
const Activity = require('./../models/activity');
const cache = require('./../cache');
const config = require('./../../config');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear+"-1-1");

exports.findByCurrentYear = async(req, res, next) => {
	try {
		let ev = await Event.find()
			.where('startDate').gte(startCurYear)
			.where('isInternal').equals(false)
			.sort({ location: 1, startDate: 1 })
			.exec();
		return res.json(ev);
	} catch(err) { return next(err); }
};

exports.findByCurrentYearAndLocation = async(req, res, next) => {
	try {
		let ev = await Event.find()
			.where('startDate').gte(startCurYear)
			.where('isInternal').equals(false)
			.where('location').equals(req.params.location)
			.sort({ startDate: 1 })
			.exec();
		return res.json(ev);
	} catch(err) { return next(err); }
};

exports.findByCurrentYearAndLocationAdmin = async(req, res, next) => {
	try {
		let ev = await Event.find()
			.where('startDate').gte(startCurYear)
			.where('location').equals(req.params.location)
			.sort({ startDate: 1 })
		  	.exec();
		return res.json(ev);
	} catch(err) { return next(err); }
};

exports.getTypeByActivity = async(req, res, next) => {
	try {
		let types = await Activity.findById(req.params.activityId)
			.populate('eventId', '_id type')
			.select('eventId')
			.exec();
		return res.json(type);
	} catch(err) { return next(err); }
}

const groupByLocationQuery = () => {
	return Event.aggregate([
			{ $match:
				{ $and: [ {startDate: { $gte: startCurYear }}, {isInternal: false} ] }
			},
			{ $group:
				{ _id: "$location",
					name: { $first: "$location" },
					name_it: { $first: "$location_it" },
					countEvents: { $sum: 1 },
					distinctTypes: { $addToSet: "$type"}
				}
			},
			{ $sort: {_id: 1}}
		]);
};

exports.getGeoSelection = async(req, res, next) => {
	try {
		/*if(config.caching) {
			cache.get(req.url, function(err, cachedValue) {
				if(cachedValue !== null) return res.json(cachedValue);
				else {
					console.log("no cache");
					groupByLocationQuery().exec()
						.then(err, sel => {
							console.log("cb", err, sel);
							cache.set(req.url, sel);
							res.json(sel);
						});
					cache.set(req.url, sel);
					return res.json(sel);
				}
			});
		}
		else {*/
		let sel = await groupByLocationQuery().exec();
		return res.json(sel);
		//}
	} catch(err) { return next(err); }
}

exports.getGeoSelectionSummer = (req, res, next) => {
	Event.aggregate([
		{ $match:
			{ $and: [ {startDate: { $gte: startCurYear }}, {isInternal: false}, {type: { $in: ['summer', 'music']}} ] }
		},
		{ $group:
			{ _id: "$location",
		      name: { $first: "$location" },
  			  name_it: { $first: "$location_it" },
			  countEvents: { $sum: 1 },
			  distinctTypes: { $addToSet: "$type"}
		    }
		},
		{ $sort: {_id: 1}}
	], function(er, result) {
		return res.json(result);
	});
}

exports.getTypeSelection = (req, res, next) => {
	Event.aggregate([
		{ $match:
			{ $and: [ {startDate: { $gte: startCurYear }}, {isInternal: false}, {type: { $nin: ['summer', 'music']}} ] }
		},
		{ $group:
			{ _id: "$type",
			  name: { $first: "$type" },
			  name_it: { $first: "$type" },
			  countEvents: { $sum: 1 },
			  distinctTypes: { $addToSet: "$type"}
		    }
		},
		{ $sort: {_id: 1}}
	], function(er, result) {
		return res.json(result);
	});
}

exports.findByCurrentYearAndLocationSummer = (req, res, next) => {
	Event.find()
		.where('startDate').gte(startCurYear)
		.where('location').equals(req.params.location)
		.where('isInternal').equals(false)
		.where('type').in(['summer', 'music'])
		.sort({ startDate: 1 })
	  	.exec(function(err, ev) {
			if(err) { return next(err); }
			res.json(ev);
	});
}

exports.findByCurrentYearAndLocationSummerAdmin = (req, res, next) => {
	Event.find()
		.where('startDate').gte(startCurYear)
		.where('location').equals(req.params.location)
		.where('type').in(['summer', 'music'])
		.sort({ startDate: 1 })
	  	.exec(function(err, ev) {
			if(err) { return next(err); }
			res.json(ev);
	});
}

exports.findByCurrentYearAndType = (req, res, next) => {
	Event.find()
		.where('startDate').gte(startCurYear)
		.where('isInternal').equals(false)
		.where('type').equals(req.params.type)
		.sort({ location: 1, startDate: 1 })
	.exec(function(err, ev) {
		if(err) { return next(err); }
		res.json(ev);
	});
};

exports.findByCurrentYearAndTypeAdmin = (req, res, next) => {
	Event.find()
		.where('startDate').gte(startCurYear)
		.where('type').equals(req.params.type)
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
		name_it: req.body.name_it,
		description: req.body.description,
		description_it: req.body.description_it,
		type: req.body.type,
		location: req.body.location,
		location_it: req.body.location_it,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		visibleFrom: req.body.visibleFrom,
		visibleTo: req.body.visibleTo,
		deadline: req.body.deadline,
		budgetFood: req.body.budgetFood,
		budgetBusiness: req.body.budgetBusiness,
	  	info: req.body.info,
		info_it: req.body.info_it,
		isInternal: req.body.isInternal
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
	console.log("Body update", req.body);
	Event.findById(req.body._id, function(err, ev) {
		if(!ev) return next(new Error('Kein Event im System mit id ' + req.body._id));
		ev.name = req.body.name;
		ev.name_it = req.body.name_it;
		ev.description = req.body.description;
		ev.description_it = req.body.description_it;
		ev.type = req.body.type;
		ev.location = req.body.location;
		ev.location_it = req.body.location_it;
		ev.startDate = req.body.startDate;
		ev.endDate = req.body.endDate;
		ev.visibleFrom = req.body.visibleFrom;
		ev.visibleTo = req.body.visibleTo;
		ev.deadline = req.body.deadline;
		ev.budgetFood = req.body.budgetFood;
		ev.budgetBusiness = req.body.budgetBusiness;
		ev.info = req.body.info;
		ev.info_it = req.body.info_it;
		ev.isInternal = req.body.isInternal;

		ev.save(function(erre, eve) {
			if(erre) next(erre);
			res.status(201).json(eve);
		});
	});
};
