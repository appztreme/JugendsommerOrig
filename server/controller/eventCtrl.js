'use strict';
const Event = require('./../models/event');
const Activity = require('./../models/activity');
// const cache = require('./../cache');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear+"-1-1");

exports.findByCurrentYear = (req, res, next) => {
	Event.find()
		.where('startDate').gte(startCurYear)
		.where('isInternal').equals(false)
		.sort({ location: 1, startDate: 1 })
	  .exec(function(err, ev) {
			if(err) { return next(err); }
			res.json(ev);
	});
};

exports.getGeoSelection = (req, res, next) => {
	// console.log("URL", req.url);
	// cache.get(req.url, function(err, cacheResult) {
	// 	if(cacheResult != null) return res.json(cacheResult);
	// 	else {
	// 		console.log("run from db");
			Event.aggregate([
				{ $match:
					{ $and: [ {startDate: { $gte: startCurYear }}, {isInternal: false} ] }
				},
				{ $group:
					{ _id: "$location",
					  countEvents: { $sum: 1 },
					  distinctTypes: { $addToSet: "$type"}
				    }
				},
				{ $sort: {_id: 1}}
			], function(er, result) {
				// cache.set(req.url, result);
				return res.json(result);
			});
	// 	}
	// });
}

exports.getGeoSelectionSummer = (req, res, next) => {
	Event.aggregate([
		{ $match:
			{ $and: [ {startDate: { $gte: startCurYear }}, {isInternal: false}, {type: { $in: ['summer', 'music']}} ] }
		},
		{ $group:
			{ _id: "$location",
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
			  countEvents: { $sum: 1 },
			  distinctTypes: { $addToSet: "$type"}
		    }
		},
		{ $sort: {_id: 1}}
	], function(er, result) {
		return res.json(result);
	});
}

exports.getTypeByActivity = (req, res, next) => {
	Activity.findById(req.params.activityId)
		.populate('eventId', '_id type')
		.select('eventId')
		.exec(function(err, type) {
			if(err) { return next(err); }
			res.json(type);
		});
}

exports.findByCurrentYearAndLocation = (req, res, next) => {
	Event.find()
		.where('startDate').gte(startCurYear)
		.where('isInternal').equals(false)
		.where('location').equals(req.params.location)
		.sort({ startDate: 1 })
	.exec(function(err, ev) {
		if(err) { return next(err); }
		res.json(ev);
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

exports.findByCurrentYearAndLocationAdmin = (req, res, next) => {
	Event.find()
		.where('startDate').gte(startCurYear)
		.where('location').equals(req.params.location)
		.sort({ startDate: 1 })
	  	.exec(function(err, ev) {
			if(err) { return next(err); }
			res.json(ev);
	});
};

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
		description: req.body.description,
		type: req.body.type,
		location: req.body.location,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		visibleFrom: req.body.visibleFrom,
		visibleTo: req.body.visibleTo,
		budgetFood: req.body.budgetFood,
		budgetBusiness: req.body.budgetBusiness,
	  info: req.body.info,
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
		ev.isInternal = req.body.isInternal;

		ev.save(function(erre, eve) {
			if(erre) next(erre);
			res.status(201).json(eve);
		});
	});
};
