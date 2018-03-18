'use strict';

const Registration = require('./../models/registration');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.findByEventId = (id) => {
    return Registration.find()
}

exports.filter = (year, name, receiptNr, activityId, activityIds) => {
    const minDate = new Date(year + "-1-1");
    const maxDate = new Date(year + "-12-31");
    let query = undefined;
    if(name) query = Registration.find({ $or: [
            {lastNameChild:  {'$regex': name, $options: 'i' }},
            {lastNameParent: {'$regex': name, $options: 'i' }},
            {firstNameChild: {'$regex': name, $options: 'i' }},
            {firstNameParent: {'$regex': name, $options: 'i' }}
        ]});
    else query = Registration.find();

    if(receiptNr) query = query.where('receiptNumber').equals(receiptNr);
    if(activityId) query = query.where('activityId').equals(activityId);
    if(activityIds) query = query.where('activityId').in(activityIds);

    return query
        .where('registrationDate').gte(minDate).lte(maxDate)
        .populate({path:'activityId', populate:{path:'eventId'}})
		.sort({ activityId: 1, registrationDate: 1, lastNameChild: 1, firstNameChild: 1})
		.exec();
}