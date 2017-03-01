'use strict';
const Registration = require('./../models/registration');

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
