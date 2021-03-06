'use strict';
const Registration = require('./../models/registration');
const RegistrationRepo = require('./../repositories/registration');
const MailBuilder = require('./mailBuilder');
const platform = require('./platform');
const Activity = require('./../models/activity');
const fs = require('fs');
const pdf = require('pdfkit');
const { hostname } = require('os');

const curYear = new Date().getFullYear();
const prevYear = curYear - 1;
const startCurYear = new Date(curYear, 0, 1);
const startPrevYear = new Date(prevYear, 0, 1);

exports.find = (req, res, next) => {
	const instance = platform.getPlatform(req.hostname);
	//console.log(instance);
	const minDate = instance.isKiso ? startPrevYear : startCurYear;
	Registration.find({ userId: req.params.userId })
	    .where('registrationDate').gte(minDate)
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

exports.getConfirmationDe = async(req, res, next) => {
	try {
		var doc = await getConfirmation(req.params.registrationId, req.hostname, 'de');
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'inline; filename="confirmation.pdf"');
		doc.pipe(res);
		doc.end();
	} catch(err) { next(err); }
}

exports.getConfirmationIt = async(req, res, next) => {
	try {
		var doc = await getConfirmation(req.params.registrationId, req.hostname, 'it');
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'inline; filename="confirmation.pdf"');
		doc.pipe(res);
		doc.end();
	} catch(err) { next(err); }
}

const getConfirmation = async(registrationId, hostname, lang) => {
	var doc = new pdf();
	let reg = await RegistrationRepo.findById(registrationId);
	let regs = await RegistrationRepo.findByFirstLastNameBirthday(reg.firstNameChild, reg.lastNameChild, reg.birthdayChild);
	if(regs.length > 0) {
		let regsInEvent = regs.filter(o => o.activityId.eventId._id.toString() === reg.activityId.eventId._id.toString() && o.isPaymentDone);
		var instance = platform.getPlatform(hostname);
		doc = await MailBuilder.getConfirmationPDF(instance, regsInEvent, lang);
	}
	return doc;	
}
