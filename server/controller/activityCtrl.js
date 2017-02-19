'use strict';
const Activity = require('./../models/activity');

exports.find = (req, res, next) => {
	// get all activities for a given event
	if(req.query.eventId) {
		Activity.find()
			.where('eventId').equals(req.query.eventId)
			.sort('startDate')
	     	.exec(function(err, activities) {
				if(err) { return next(err); }
				res.json(activities);
		});
	}
	// get all activity siblings for a given activity
	if(req.query.activityId) {
		Activity.findById(req.query.activityId, function(err, activity) {
			if(err) { return next(err); }
			Activity.find()
				.where('eventId').equals(activity.eventId)
				.sort('startDate')
				.exec(function(err, activities) {
					if(err) { return next(err); }
					res.json(activities);
				});
		});
	}
};

exports.findById = (req, res, next) => {
	Activity.findById(req.params.activityId, function(err, activity) {
		if(err) { return next(err); }
		res.json(activity);
	});
};

exports.create = (req, res, next) => {
	var activity = new Activity({
		name: req.body.name,
		name_it: req.body.name_it,
		description: req.body.description,
		description_it: req.body.description_it,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		eventId: req.body.eventId,
		maxParticipants: req.body.maxParticipants,
		queueSize: req.body.queueSize
	});
	activity.save(function(err, activity) {
		if(err) { return next(err); }
		res.status(201).json(activity);
	});
};

exports.update = (req, res, next) => {
	Activity.findById(req.body._id, function(err, activity) {
		if(!activity) return next(new Error('Keine Activity im System mit id ' + req.body._id));
		activity.name = req.body.name;
		activity.name_it = req.body.name;
		activity.description = req.body.description;
		activity.description_it = req.body.description_it;
		activity.startDate = req.body.startDate;
		activity.endDate = req.body.endDate;
		activity.maxParticipants = req.body.maxParticipants;
		activity.queueSize = req.body.queueSize;

		activity.save(function(err) {
			if(err) next(err);
			res.status(201).json(activity);
		});
	});
};
