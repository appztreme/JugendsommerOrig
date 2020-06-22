'use strict';
const Registration = require('./../models/registration');
const RegistrationRepo = require('./../repositories/registration');
const MailBuilder = require('./mailBuilder');
const platform = require('./platform');
const Activity = require('./../models/activity');
const fs = require('fs');
const pdf = require('pdfkit');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear, 0, 1);

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

exports.getConfirmation = async(req, res, next) => {
	try {
		var doc = new pdf();
		let reg = await RegistrationRepo.findById(req.params.registrationId);
		let regs = await RegistrationRepo.findByFirstLastNameBirthday(reg.firstNameChild, reg.lastNameChild, reg.birthdayChild);
		if(regs.length > 0) {
			let regsInEvent = regs.filter(o => o.activityId.eventId._id.toString() === reg.activityId.eventId._id.toString() && o.isPaymentDone);
			var instance = platform.getPlatform(req.hostname);
			doc = await MailBuilder.getConfirmationPDF(instance, regsInEvent);
		}
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'inline; filename="confirmation.pdf"');
		doc.pipe(res);
		doc.end();
	} catch(err) { next(err); }	
}
