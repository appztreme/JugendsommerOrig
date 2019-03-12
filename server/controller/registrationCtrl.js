'use strict';
const Registration = require('./../models/registration');
const Event = require('./../models/event');
const Activity = require('./../models/activity');

const ActivityRepo = require('./../repositories/activity');
const RegistrationRepo = require('./../repositories/registration');
const SequenceRepo = require('./../repositories/sequence');
const mail = require('./mail');
const platform = require('./platform');
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
		let result = await RegistrationRepo.filter(req.query.year, req.query.name, req.query.firstname, req.query.receiptNumber, req.query.activityId, activityIds);
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

exports.create = async(req, res, next) => {
	var regs = [];
	for (var i = 0; i < req.body.activityId.length; i++) {
		//console.log('ebk', req.body.needsEbK)
		//console.log('birthdayChild', req.body.birthdayChild)
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
			activityId: req.body.activityId[i],
			addressChild: req.body.addressChild,
			cityChild: req.body.cityChild,
			needsPreCare: req.body.needsPreCare,
			hasDisability: req.body.hasDisability,
			disabilityDescription: req.body.disabilityDescription,
			needsEbK: req.body.needsEbK,
			canSwim: req.body.canSwim,
			canGoHomeAllone: req.body.canGoHomeAllone,
			isSiblingReservation: req.body.isSiblingReservation,
			acceptsOptionalFee: req.body.acceptsOptionalFee,
			acceptsNewsletter: req.body.acceptsNewsletter,
			acceptsMediaPublication: req.body.acceptsMediaPublication,
			commentInternal: req.body.commentInternal,
			userId: req.body.userId
		});
		regs.push(reg);	
	}
	var objids = [];
	for(var i=0; i < req.body.activityId.length; i++) {
		objids.push(new mongoose.Types.ObjectId(req.body.activityId[i].trim()));
	}
	var activities = [];
	try {
		activities = await Activity.find({'_id': { $in: objids } })
							   .populate('eventId', '_id name name_it location location_it deadline feePerWeek penalty optionalFeePerWeek siblingDiscount')
							   .select('_id name name_it maxParticipants curParticipants eventId');
	} catch(e) { console.log(e); }
	Registration.create(regs, function(error, docs) {
		if(error) { console.log(error); return next(error); }
		var instance = platform.getPlatform(req.get('host'));
		mail.sendTxtMail(req.body.emailParent, req.body.firstNameChild, req.body.lastNameChild, req.body.type, activities, req.body, instance);
		res.status(201).json(docs);
	})
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
		reg.hasDisability = req.body.hasDisability;
		reg.disabilityDescription = req.body.disabilityDescription;
		reg.needsEbK = req.body.needsEbK;
		reg.canSwim = req.body.canSwim;
		reg.canGoHomeAllone = req.body.canGoHomeAllone;
		reg.acceptsMediaPublication = req.body.acceptsMediaPublication;
		reg.acceptsNewsletter = req.body.acceptsNewsletter;
		reg.acceptsOptionalFee = req.body.acceptsOptionalFee;
		reg.isSiblingReservation = req.body.isSiblingReservation;
		reg.commentInternal = req.body.commentInternal;
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

exports.updateProperty = (req, res, next) => {
	Registration.findById(req.body._id, function(err, reg) {
		if(!reg) return next(new Error('Keine Registrierung im System mit id ' + req.body._id));
		reg[req.body.property] = req.body.value;
		reg.save(function(err, regDb) {
			if(err) { return next(err); }
			res.status(201).json(regDb);
		});
	});
}

exports.sendPaymentMail = async(req, res, next) => {
	try {
		let activityIds = undefined;
		if(req.params.eventId) {
			let ids = await ActivityRepo.getActivityIdsForEvent(req.params.eventId);
			activityIds = ids.map(function(v,i) { return v._id; });
			let registrationsWithoutQueue = [];
			let registrations = await RegistrationRepo.filter(curYear, null, null, null, null, activityIds);
			const activities = new Set(registrations.map((v,i) => v.activityId));
			activities.forEach(vA => {
				const fixRegistrations = registrations.filter(v => v.activityId._id === vA._id).filter((v,i) => i < vA.maxParticipants);
				registrationsWithoutQueue = registrationsWithoutQueue.concat(fixRegistrations);
			})
			let emails = registrationsWithoutQueue.map(function(v,i) { return v.emailParent; });
			let emailsUnique = new Set(emails);
			var instance = platform.getPlatform(req.get('host'));
			for(let email of emailsUnique) {
				var sentWithError = false;
				let registrationsPerMail = registrationsWithoutQueue.filter(reg => reg.emailParent === email && reg.isEmailNotified === false);
				//console.log("email", email, registrationsPerMail.length);
				if(registrationsPerMail.length === 0) continue;
				let receiptNr = await SequenceRepo.nextReceipt();
				//console.log("receipt number", receiptNr);
				mail.sendReceiptMail(email, registrationsPerMail, receiptNr.seq, instance);
			}
		}
	
		res.status(201).json({ success: "true"});
	}
	catch(err) { next(err); }	
}

exports.sendSinglePaymentMail = async(req, res, next) => {
	try {
		let reg = await RegistrationRepo.findById(req.params.registrationId);
		if(reg) {
			let instance = platform.getPlatform(req.get('host'));
			let receiptNr = await SequenceRepo.nextReceipt();
			mail.sendReceiptMail(reg.emailParent, [reg], receiptNr.seq, instance);

			res.status(201).json({ success: "true" });
		}
		res.status(500).json({ success: "false", msg: "no registration found"})
	} catch(err) { console.log(err); next(err); }
}

exports.sendReminderMail = async(req, res, next) => {
	try {
		let activityIds = undefined;
		if(req.params.eventId) {
			let ids = await ActivityRepo.getActivityIdsForEvent(req.params.eventId);
			activityIds = ids.map(function(v,i) { return v._id; });
			let registrations = await RegistrationRepo.findNotifiedWithoutPayment(curYear, activityIds);
			let emails = registrations.map(function(v,i) { return v.emailParent; });
			let emailsUnique = new Set(emails);
			var instance = platform.getPlatform(req.get('host'));
			for(let email of emailsUnique) {
				//var sentWithError = false;
				let registrationsPerMail = registrations.filter(reg => reg.emailParent === email);
				if(registrationsPerMail.length === 0) continue;
				mail.sendReminderMail(email, registrationsPerMail, instance);
			}
		}
	
		res.status(201).json({ success: "true"});
	}
	catch(err) { next(err); }
}
