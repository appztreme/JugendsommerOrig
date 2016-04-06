var Registration = require('../../models/registration');
var Event = require('../../models/event');
var Activity = require('../../models/activity');
var auth = require('./authentication');
var router = require('express').Router();
var deepPopulate = require('mongoose-deep-populate');

router.get('/:userId', auth.requiresApiLogin, function(req, res, next) {
	Registration.find({ userId: req.params.userId })
		.deepPopulate('activityId.eventId')
		.sort({ activityId: 1, lastNameChild: 1, firstNameChild: 1 })
		.exec(function(err, reg) {
			if(err) { return next(err); }
			res.json(reg);
		});
});

module.exports = router;
