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
const moment = require('moment');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.find = async(req, res, next) => {
	try {
		let activityIds = undefined;
		if(req.query.eventId) {
			let ids = await ActivityRepo.getActivityIdsForEvent(req.query.eventId);
			activityIds = ids.map(function(v,i) { return v._id; });
		}
		let result = await RegistrationRepo.filter(req.query.year, req.query.name, req.query.firstname, req.query.receiptNumber, req.query.activityId, activityIds, req.query.city);
		res.json(result);
	}
	catch(err) { next(err); }
};

const calculateFee = reg => {
	var fee = reg.activityId.eventId.feePerWeek;
	if(reg.acceptsOptionalFee) {
		fee = fee + reg.activityId.eventId.optionalFeePerWeek;
	}
	if(reg.isSiblingReservation) {
		fee = fee - reg.activityId.eventId.siblingDiscount;
	}
	if(reg.activityId.eventId.deadline) {
		if((moment(reg.activityId.eventId.deadline).hour(23).minute(59).second(59)).isBefore(moment(reg.registrationDate))) fee = fee + reg.activityId.eventId.penalty;	
	}
	return fee;
}

const indexOfArray = (array, fullName, eventId) => {
	for(var i=0; i < array.length; i++) {
		if(array[i].fullName === fullName && array[i].eventId === eventId) return i;
	}
	return -1;
}

const aggregateOverviewStructure = async (regs) => {
	var output = [];
	var nameIndex = [];
	var activityNames = [];

	for(var i=0; i < regs.length; i++) {
		var r = regs[i];
		var fullName = r.lastNameChild + ' ' + r.firstNameChild + ' ' + r.activityId.eventId._id;
		if(nameIndex.indexOf(fullName) > -1) {
			// UPDATE
			var outputIndex = indexOfArray(output, fullName, r.activityId.eventId._id);
			if(outputIndex > -1) {
				output[outputIndex][r.activityId.name] = { participate: true, paied: r.isPaymentDone };
				output[outputIndex]["fee"] += calculateFee(r);
				output[outputIndex]["paied"] = r.isPaymentDone && output[outputIndex]["paied"]; 
			}

		} else {
			// INSERT
			var entry = {
				"event": r.activityId.eventId.location + ' - ' + r.activityId.eventId.name,
				"eventId": r.activityId.eventId._id,
				"firstNameChild": r.firstNameChild,
				"lastNameChild": r.lastNameChild,
				"fullName": fullName,
				"birthdayChild": r.birthdayChild,
				"schoolChild": r.schoolChild,
				"addressChild": r.addressChild,
				"cityChild": r.cityChild,
				"phoneNumberParent": r.phoneNumberParent,
				"emailParent": r.emailParent,
				"healthChild": r.healthChild,
				"canSwim": r.canSwim,
				"needsEbK": r.needsEbK,
				"canGoHomeAllone": r.canGoHomeAllone,
				"firstNameUser": r.userId.firstName,
				"lastNameUser": r.userId.lastName,
				"fee": calculateFee(r),
				"paied": r.isPaymentDone,
				"commentInternal": r.commentInternal
			}
			var activities = await ActivityRepo.getActivitiesForEvent(r.activityId.eventId._id);
			for(var j=0; j < activities.length; j++) {
				entry[activities[j].name] = { participate: false, paied: false};
				if(activityNames.indexOf(activities[j].name) === -1) activityNames.push(activities[j].name);
			}
			entry[r.activityId.name] = { participate: true, paied: r.isPaymentDone };
			nameIndex.push(fullName);
			output.push(entry);
		}
	}
	return { activityNames: activityNames, registrations: output};
}

exports.overview = async(req, res, next) => {
	try {
		let activityIds = undefined;
		if(req.query.eventId) {
			let ids = await ActivityRepo.getActivityIdsForEvent(req.query.eventId);
			activityIds = ids.map(function(v,i) { return v._id; });
		}
		let result = await RegistrationRepo.filter(req.query.year, null, null, null, req.query.activityId, activityIds, null);
		result = await aggregateOverviewStructure(result);
		res.json(result);
	}
	catch(err) { next(err); }
}

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
			hasOwnEBike: req.body.hasOwnEBike,
			heightChild: req.body.heightChild,
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
			hasHealthIssues: req.body.hasHealthIssues,
			healthIncompatibility: req.body.healthIncompatibility,
			healthAllergy: req.body.healthAllergy,
			healthIllnes: req.body.healthIllnes,
			hasDisability: req.body.hasDisability,
			disabilityDescription: req.body.disabilityDescription,
			diagnosticDescription: req.body.diagnosticDescription,
			needsEbK: req.body.needsEbK,
			canSwim: req.body.canSwim,
			canGoHomeAllone: req.body.canGoHomeAllone,
			isSiblingReservation: req.body.isSiblingReservation,
			acceptsOptionalFee: req.body.acceptsOptionalFee,
			acceptsNewsletter: req.body.acceptsNewsletter,
			acceptsMediaPublication: req.body.acceptsMediaPublication,
			commentInternal: req.body.commentInternal,
			preferredFellow: req.body.preferredFellow,
			userId: req.body.userId,
			covidRules: req.body.covidRules
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
		//reg.healthChild = req.body.healthChild;
		reg.tShirtSize = req.body.tShirtSize;
		reg.hasOwnEBike = req.body.hasOwnEBike;
		reg.heightChild = req.body.heightChild;
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
		reg.hasHealthIssues = req.body.hasHealthIssues;
		reg.healthIncompatibility = req.body.healthIncompatibility;
		reg.healthAllergy = req.body.healthAllergy;
		reg.healtIllnes = req.body.healthIllnes;
		reg.hasDisability = req.body.hasDisability;
		reg.disabilityDescription = req.body.disabilityDescription;
		reg.diagnosticDescription = req.body.diagnosticDescription;
		reg.needsEbK = req.body.needsEbK;
		reg.canSwim = req.body.canSwim;
		reg.canGoHomeAllone = req.body.canGoHomeAllone;
		reg.acceptsMediaPublication = req.body.acceptsMediaPublication;
		reg.acceptsNewsletter = req.body.acceptsNewsletter;
		reg.acceptsOptionalFee = req.body.acceptsOptionalFee;
		reg.isSiblingReservation = req.body.isSiblingReservation;
		reg.commentInternal = req.body.commentInternal;
		reg.preferredFellow = req.body.preferredFellow;
		reg.save(function(err, regDb) {
			if(err) { console.log(err); return next(err); }
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
				if(registrationsPerMail.length === 0) continue;
				let receiptNr = await SequenceRepo.nextReceipt();
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

exports.getChildrenPerEvent = async(req, res, next) => {
	try {
		let activityIds = undefined;
		let childrenUnique = [];
		if(req.params.eventId) {
			let ids = await ActivityRepo.getActivityIdsForEvent(req.params.eventId);
			activityIds = ids.map(function(v,i) { return v._id; });
			let registrationsWithoutQueue = [];
			let registrations = await RegistrationRepo.filter(curYear, null, null, null, null, activityIds);
			const activities = new Set(registrations.map((v,i) => v.activityId));
			activities.forEach(vA => {
				const fixRegistrations = registrations.filter(v => v.activityId._id === vA._id); // .filter((v,i) => i >= vA.maxParticipants);
				registrationsWithoutQueue = registrationsWithoutQueue.concat(fixRegistrations);
			})
			let children = registrationsWithoutQueue.map(function(v,i) { return {firstName: v.firstNameChild, lastName: v.lastNameChild, birthday: v.birthdayChild }; });
			childrenUnique = [...new Set(children)];
			childrenUnique.sort((a,b) => a.lastName < b.lastName);
		}
	
		res.status(200).json(childrenUnique);
	}
	catch(err) { next(err); }
}

exports.sendConfirmationMailSingle = async(req, res, next) => {
	try {
		let reg = await RegistrationRepo.findByFirstLastNameBirthday(req.body.firstName, req.body.lastName, req.body.birthday);
		if(reg.length > 0) {
			let registrationsForEvent = reg.filter(v => v.activityId.eventId._id == req.body.eventId && v.isPaymentDone);
			var instance = platform.getPlatform(req.get('host'));
			if(registrationsForEvent.length > 0) {
				mail.sendConfirmationMail(req.body.email, registrationsForEvent, instance);
			}
		}
		res.status(201).json({'success': "true"});	
	} catch(err) { next(err); }	}

exports.sendConfirmationMail = async(req, res, next) => {
	try {
		let activityIds = undefined;
		if(req.params.eventId) {
			let ids = await ActivityRepo.getActivityIdsForEvent(req.params.eventId);
			activityIds = ids.map(function(v,i) { return v._id; });
			let registrationsWithoutQueue = [];
			let registrations = await RegistrationRepo.filter(curYear, null, null, null, null, activityIds);
			const activities = new Set(registrations.map((v,i) => v.activityId));
			activities.forEach(vA => {
				const fixRegistrations = registrations.filter(v => v.activityId._id === vA._id); //.filter((v,i) => i >= vA.maxParticipants);
				registrationsWithoutQueue = registrationsWithoutQueue.concat(fixRegistrations);
			})
			let emails = registrationsWithoutQueue.map(function(v,i) { return v.emailParent; });
			let emailsUnique = new Set(emails);
			var instance = platform.getPlatform(req.get('host'));
			for(let email of emailsUnique) {
				let registrationsPerMail = registrationsWithoutQueue.filter(reg => reg.emailParent === email && reg.isPaymentDone);
				if(registrationsPerMail.length === 0) continue;
				try {
					console.log("INFO: try starting sending confirmation mail");
					mail.sendConfirmationMail(email, registrationsPerMail, instance);
				} catch(e) {
					console.log("ERROR:", e);
				}
			}
		}
	
		res.status(201).json({ success: "true"});
	}
	catch(err) { next(err); }	
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
