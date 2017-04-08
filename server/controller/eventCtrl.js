'use strict';
const Event = require('./../models/event');
const Activity = require('./../models/activity');
const EventRepo = require('./../repositories/event');
const config = require('./../../config');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear+"-1-1");

exports.findByCurrentYear = async(req, res, next) => {
	try {
		let evs = await EventRepo.findByCurrentYear();
		return res.json(evs);
	} catch(err) { return next(err); }
}

exports.findByCurrentYearAndLocation = async(req, res, next) => {
	try {
		let evs = await EventRepo.findByCurrentYearAndLocation(req.params.location);
		return res.json(evs);
	} catch(err) { return next(err); }
}

exports.findByCurrentYearAndLocationAdmin = async(req, res, next) => {
	try {
		let evs = await EventRepo.findByCurrentYearAndLocation(req.params.location, true);
		return res.json(evs);
	} catch(err) { return next(err); }
}

exports.findByCurrentYearAndLocationSummer = async(req, res, next) => {
	try {
		let evs = await EventRepo.findByCurrentYearAndLocationSummer(req.params.location);
		return res.json(evs);
	} catch(err) { return next(err); }
}

exports.findByCurrentYearAndLocationSummerAdmin = async(req, res, next) => {
	try {
		let evs = await EventRepo.findByCurrentYearAndLocationSummer(req.params.location, true);
		return res.json(evs);
	} catch(err) { return next(err); }
}

exports.findByCurrentYearAndType = async(req, res, next) => {
	try {
		let evs = await EventRepo.findByCurrentYearAndType(req.params.type);
		return res.json(evs);
	} catch(err) { return next(err); }
}

exports.findByCurrentYearAndTypeAdmin = async(req, res, next) => {
	try {
		let evs = await EventRepo.findByCurrentYearAndType(req.params.type, true);
		return res.json(evs);
	} catch(err) { return next(err); }
}

exports.getTypeByActivity = async(req, res, next) => {
	try {
		let types = await Activity.findById(req.params.activityId)
			.populate('eventId', '_id type')
			.select('eventId')
			.exec();
		return res.json(type);
	} catch(err) { return next(err); }
}

exports.getGeoSelection = async(req, res, next) => {
	try {
		let sel = await EventRepo.groupByLocation();
		return res.json(sel);
	} catch(err) { return next(err); }
}

exports.getGeoSelectionSummer = async(req, res, next) => {
	try {
		let sel = await EventRepo.groupByLocationSummer();
		return res.json(sel);
	}
	catch(err) { return next(err); }
}

exports.getTypeSelection = async(req, res, next) => {
	try {
		let sel = await EventRepo.groupByType();
		return res.json(sel);
	}
	catch(err) { return next(err); }
}

exports.findByEventId = async(req, res, next) => {
	try {
		let ev = await EventRepo.findById(req.params.eventId);
		return res.json(ev);
	} catch(err) { return next(err); }
}

exports.getContactsForEvent = async(req, res, next) => {
	try {
		let cs = await EventRepo.getContacts(req.params.eventId);
		return res.json(cs);
	} catch(err) { return next(err); }
}

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

exports.delete = async(req, res, next) => {
	try {
		let ev = await EventRepo.delete(req.params.eventId);
		res.status(200).json(ev);
	}
	catch(err) { return (err); }
}

exports.update = (req, res, next) => {
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

exports.updateContacts = async(req, res, next) => {
	try {
		let ev = await EventRepo.findById(req.params.eventId);
		if(ev) {
			
			return res.status(200).json(ev);
		}
		return res.status(500);
	}
	catch(err) { return next(err); }
}