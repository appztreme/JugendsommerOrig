'use strict';
const Activity = require('./../models/activity');

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

exports.getActivityIdsForEvent = (eventId) => {
	return Activity.find()
			.where('eventId').equals(eventId)
			.select('_id')
			.exec();
}

exports.findById = (id) => {
    return Activity.findById(id);
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