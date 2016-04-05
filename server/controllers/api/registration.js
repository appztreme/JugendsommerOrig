var Registration = require('../../models/registration');
var Event = require('../../models/event');
var Activity = require('../../models/activity');
var auth = require('./authentication');
var mail = require('./mail');
var mongoose = require('mongoose');
var router = require('express').Router();
var deepPopulate = require('mongoose-deep-populate');

var curYear = new Date().getFullYear();
var startCurYear = new Date(curYear,1,1);

var queryReport = function(query, res) {
	query.deepPopulate('activityId.eventId')
				.sort({ activityId: 1, lastNameChild: 1, firstNameChild: 1})
				.exec(function(err, reg) {
					if(err) { return next(err); }
					res.json(reg);
		});
};

var getRegistrationsAll = function(res) {
	Registration.find()
		.where('registrationDate').gte(startCurYear)
		.deepPopulate('activityId.eventId')
		.sort({ activityId: 1, lastNameChild: 1, firstNameChild: 1})
		.exec(function(err, reg) {
			if(err) { return next(err); }
			res.json(reg);
		});
};

var getRegistrationsByEventId = function(eventId, res) {
	Activity.find()
		.where('eventId').equals(eventId)
		.select({ __id: 1})
		.exec(function(err, acts) {
			if(err) { return next(err); }
				Registration.find()
					.where('registrationDate').gte(startCurYear)
					.where('activityId').in(acts)
					.deepPopulate('activityId.eventId')
					.sort({ activityId: 1, lastNameChild: 1, firstNameChild: 1})
					.exec(function(err, reg) {
						if(err) { return next(err); }
						res.json(reg);
					});
		});
};

var getRegistrationsByActivityId = function(activityId, res) {
	Registration.find()
		.where('registrationDate').gte(startCurYear)
		.where('activityId').equals(activityId)
		.deepPopulate('activityId.eventId')
		.sort({ activityId: 1, lastNameChild: 1, firstNameChild: 1})
		.exec(function(err, reg) {
			if(err) { return next(err); }
			res.json(reg);
		});
};

router.get('/', auth.requiresRole("admin"), function(req, res, next) {
	if(!req.query.activityId && !req.query.eventId)
		return getRegistrationsAll(res);
	if(req.query.activityId)
		return getRegistrationsByActivityId(req.query.activityId, res);
	if(req.query.eventId)
		return getRegistrationsByEventId(req.query.eventId, res);
});

router.get('/selectableEventActivities', function(req, res, next) {
		Activity.find()
			.where('startDate').gte(startCurYear)
			.populate('eventId', '_id name location')
			.select('_id name eventId')
            .sort({'eventId.location': 1})
			.exec(function(err, act) {
				if(err) { return next(err); }
				res.json(act);
			});
});

router.get('/:registrationId', auth.requiresRole("admin"), function(req, res, next) {
	Registration.findById(req.params.registrationId, function(err, registration) {
		if(err) { return next(err); }

		res.json(registration);
	});
});

router.delete('/:registrationId', auth.requiresRole("admin"), function(req, res, next) {
	Registration.findByIdAndRemove(req.params.registrationId, function(err, reg) {
		if(err) { return next(err); }
		Activity.findById(reg.activityId, function(err, activity) {
			activity.curParticipants -= 1;
			activity.save();
			res.status(200).json(reg);
		});
	});
});

router.post('/', auth.requiresApiLogin, function(req, res, next) {
	var reg = new Registration({
		firstNameParent: req.body.firstNameParent,
		lastNameParent: req.body.lastNameParent,
	  phoneNumberParent: req.body.phoneNumberParent,
	  emailParent: req.body.emailParent,
	  firstNameChild: req.body.firstNameChild,
	  lastNameChild: req.body.lastNameChild,
	  birthdayChild: req.body.birthdayChild,
	  schoolChild: req.body.schoolChild,
	  healthChild: req.body.healthChild,
		bandName: req.body.bandName,
		instrument: req.body.instrument,
		instrumentYears: req.body.instrumentYears,
		nameContact1: req.body.nameContact1,
	  telContact1: req.body.telContact1,
	  nameContact2: req.body.nameContact2,
	  telContact2: req.body.telContact2,
	  activityId: req.body.activityId,
    userId: req.body.userId
	});
	reg.save(function(err, regr) {
		if(err) { return next(err); }
		mail.sendTxtMail(regr.emailParent, regr.firstNameChild, regr.lastNameChild);
		res.status(201).json(regr);
	});
});

router.put('/', auth.requiresRole("admin"), function(req, res, next) {
	Registration.findById(req.body._id, function(err, reg) {
		if(!reg) return next(new Error('Keine Registrierung im System mit id ' + req.body._id));
		reg.firstNameParent = req.body.firstNameParent;
		reg.lastNameParent = req.body.lastNameParent;
		reg.phoneNumberParent = req.body.phoneNumberParent;
		reg.emailParent = req.body.emailParent;
		reg.firstNameChild = req.body.firstNameChild;
		reg.lastNameChild = req.body.lastNameChild;
		reg.birthdayChild = req.body.birthdayChild;
		reg.schoolChild = req.body.schoolChild;
		reg.healthChild = req.body.healthChild;
		reg.bandName = req.body.bandName;
		reg.instrument = req.body.instrument;
		reg.instrumentYears = req.body.instrumentYears;
		reg.nameContact1 = req.body.nameContact1;
		reg.telContact1 = req.body.telContact1;
		reg.nameContact2 = req.body.nameContact2;
		reg.telContact2 = req.body.telContact2;
		reg.isPaymentDone = req.body.isPaymentDone;
		reg.isEmailNotified = req.body.isEmailNotified;
		reg.activityId = req.body.activityId;

		reg.save(function(err, regDb) {
			if(err) { return next(err); }
			res.status(201).json(regDb);
		});
	});
});

module.exports = router;
