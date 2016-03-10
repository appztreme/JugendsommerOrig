var Activity = require('../../models/activity');
var auth = require('./authentication');
var router = require('express').Router();

router.get('/', function(req, res, next) {
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
});


router.get('/:activityId', function(req, res, next) {
	Activity.findById(req.params.activityId, function(err, activity) {
		if(err) { return next(err); }
		
		res.json(activity);
	});
});

router.post('/', auth.requiresRole("admin"), function(req, res, next) {
	var activity = new Activity({
		name: req.body.name,
		description: req.body.description,
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
});

router.put('/', auth.requiresRole("admin"), function(req, res, next) {
	Activity.findById(req.body._id, function(err, activity) {
		if(!activity) return next(new Error('Keine Activity im System mit id ' + req.body._id));
		activity.name = req.body.name;
		activity.description = req.body.description;
		activity.startDate = req.body.startDate;
		activity.endDate = req.body.endDate;
		activity.maxParticipants = req.body.maxParticipants;
		activity.queueSize = req.body.queueSize;

		activity.save(function(err) {
			if(err) next(err);
			res.status(201).json(activity);
		});
	});
});

module.exports = router;
