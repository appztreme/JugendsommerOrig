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