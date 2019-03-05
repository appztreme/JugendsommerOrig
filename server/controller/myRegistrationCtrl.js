'use strict';
const Registration = require('./../models/registration');
const Activity = require('./../models/activity');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.find = (req, res, next) => {
	Registration.find({ userId: req.params.userId })
	    .where('registrationDate').gte(startCurYear)
		.populate({path: 'activityId', populate: {path: 'eventId'}})
		.sort({ activityId: 1, lastNameChild: 1, firstNameChild: 1 })
		.exec(function(err, reg) {
			if(err) { return next(err); }
			res.json(reg);
		});
};

exports.delete = (req, res, next) => {
	Registration.findByIdAndRemove(req.params.registrationId, function(err, reg) {
		if(err) { return next(err); }
		Activity.findById(reg.activityId, function(err, activity) {
			activity.curParticipants -= 1;
			activity.save();
			res.status(200).json(reg);
		});
	});
};
