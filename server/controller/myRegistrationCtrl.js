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
		//let reg = await RegistrationRepo.findByFirstLastNameBirthday(req.body.firstName, req.body.lastName, req.body.birthday);
		let reg = await RegistrationRepo.findByFirstLastNameBirthday('Nora', "Edelmaier", new Date(2017, 4, 31))
		if(reg.length > 0) {
			let registrationsForEvent = reg.filter(v => v.activityId.eventId._id == req.body.eventId && v.isPaymentDone);
			var instance = platform.getPlatform(req.hostname);
			if(registrationsForEvent.length > 0) {
				doc = await MailBuilder.getConfirmationPDF(instance, registrationsForEvent);
			}
		}
		//const stats = fs.statSync(doc.toBlob('application/pdf'));
		//res.setHeader('Content-Length', stats[size]);
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'attachment; filename=confirmation.pdf');
		res.pipe(doc);
	} catch(err) { next(err); }	
}
