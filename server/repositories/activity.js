'use strict';
const Activity = require('./../models/activity');
const mongoose = require('mongoose');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.getSelectableEventActivities = () => {
    return Activity.find()
			.where('startDate').gte(startCurYear)
			.populate('eventId', '_id name location')
			.select('_id name eventId')
            .sort({'eventId.location': 1})
			.exec();
}

exports.findForCurrentYear = () => {
	return Activity.find()
		.where('startDate').gte(startCurYear)
		.select('_id name curParticipants maxParticipants')
		.exec();
}

exports.getActivityIdsForEvent = (eventId) => {
	return Activity.find()
			.where('eventId').equals(eventId)
			.select('_id')
			.exec();
}

exports.findById = (id) => {
	console.log("findbyid")
    return Activity.findById(id).exec();
}

exports.findByIds = (ids) => {
	console.log(ids, "ids");
	var objids = [];
	for(var i=0; i < ids.length; i++) {
		objids.push(new mongoose.Types.ObjectId(ids[i].trim()));
	}
	//return objids;
	console.log("repor", objids);
	return Activity.find({
		'_id': { $in: objids } })
		.populate('eventId', '_id name location feePerWeek')
		.select(_id, name, eventId);
}

exports.getContacts = (id) => {
	return Activity.findById(id)
		.populate('contactRels.contact')
		.select('_id contactRels');
}

exports.getContactsForEvent = (eventId) => {
	return Activity.find({ 'eventId': eventId})
		.populate('contactRels.contact')
		.select('_id name contactRels')
		.sort({'name': 1})
}