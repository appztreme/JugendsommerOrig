'use strict';
const Registration = require('./../models/registration');
const Event = require('./../models/event');
const Activity = require('./../models/activity');

const ActivityRepo = require('./../repositories/activity');
const RegistrationRepo = require('./../repositories/registration');
const mail = require('./mail');
const mongoose = require('mongoose');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.find = async(req, res, next) => {
	try {
		let activityIds = undefined;
		if(req.query.eventId) {
			let ids = await ActivityRepo.getActivityIdsForEvent(req.query.eventId);
			activityIds = ids.map(function(v,i) { return v._id; });
		}
		let result = await RegistrationRepo.filter(req.query.year, req.query.name, req.query.activityId, activityIds);
		res.json(result);
	}
	catch(err) { next(err); }
};

exports.getSelectableEventActivities = async(req, res, next) => {
	try {
		let acts = await ActivityRepo.getSelectableEventActivities();
		res.json(acts);
	} catch(err) { next(err); }
}

exports.findById = (req, res, next) => {
	Registration.findById(req.params.registrationId, function(err, registration) {
		if(err) { return next(err); }

		res.json(registration);
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

exports.create = (req, res, next) => {
	//console.log("new reg:", req.body);
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
		tShirtSize: req.body.tShirtSize,
		bandName: req.body.bandName,
		instrument: req.body.instrument,
		instrumentYears: req.body.instrumentYears,
		nameContact1: req.body.nameContact1,
		telContact1: req.body.telContact1,
		nameContact2: req.body.nameContact2,
		telContact2: req.body.telContact2,
		activityId: req.body.activityId,
		addressChild: req.body.addressChild,
		cityChild: req.body.cityChild,
		needsPreCare: req.body.needsPreCare,
		userId: req.body.userId
	});
	reg.save(function(err, regr) {
		if(err) { return next(err); }
		var host = req.get('host');
		var isKiso = host.indexOf('kiso') !== -1;
		mail.sendTxtMail(regr.emailParent, regr.firstNameChild, regr.lastNameChild, req.body.type, isKiso);
		res.status(201).json(regr);
	});
};

exports.update = (req, res, next) => {
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
		reg.tShirtSize = req.body.tShirtSize;
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
		reg.addressChild = req.body.addressChild;
		reg.cityChild = req.body.cityChild;
		reg.needsPreCare = req.body.needsPreCare;
		reg.save(function(err, regDb) {
			if(err) { return next(err); }
			res.status(201).json(regDb);
		});
	});
};

exports.updateIsPaymentDone = (req, res, next) => {
	Registration.findById(req.body._id, function(err, reg) {
		if(!reg) return next(new Error('Keine Registrierung im System mit id ' + req.body._id));
		reg.isPaymentDone = req.body.isPaymentDone;
		reg.save(function(err, regDb) {
			if(err) { return next(err); }
			res.status(201).json(regDb);
		});
	});
};

exports.updateIsEmailNotified = (req, res, next) => {
	Registration.findById(req.body._id, function(err, reg) {
		if(!reg) return next(new Error('Keine Registrierung im System mit id ' + req.body._id));
		reg.isEmailNotified = req.body.isEmailNotified;
		reg.save(function(err, regDb) {
			if(err) { return next(err); }
			res.status(201).json(regDb);
		});
	});
};
