var Event = require('../../models/event');
var auth = require('./authentication');
var router = require('express').Router();

var curYear = new Date().getFullYear();
var startCurYear = new Date(curYear,1,1);

router.get('/', function(req, res, next) {
	Event.find()
		.where('startDate').gte(startCurYear)
		.sort({ startDate: 1 })
	  .exec(function(err, ev) {
			if(err) { return next(err); }
			res.json(ev);
	});
});

router.get('/:eventId', function(req, res, next) {
	Event.findById(req.params.eventId, function(err, ev) {
		if(err) { return next(err); }
		res.json(ev);
	});
});

router.post('/', auth.requiresRole("admin"), function(req, res, next) {
	var ev = new Event({
		name: req.body.name,
		description: req.body.description,
		type: req.body.type,
		location: req.body.location,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		visibleFrom: req.body.visibleFrom,
		visibleTo: req.body.visibleTo,
	  info: req.body.info
	});
	ev.save(function(err, ev) {
		if(err) { return next(err); }
		res.status(201).json(ev);
	});
});

router.put('/', auth.requiresRole("admin"), function(req, res, next) {
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
		ev.info = req.body.info;

		ev.save(function(erre, eve) {
			if(erre) next(erre);
			res.status(201).json(eve);
		});
	});
});

module.exports = router;
