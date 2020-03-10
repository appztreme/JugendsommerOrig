'use strict';

const Registration = require('./../models/registration');
const mongoose = require('mongoose');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.findById = (id) => {
    return Registration
        .findById(id)
        //.findOne({'_id': mongoose.Types.ObjectId(id)})
        .populate({path:'activityId', populate:{path:'eventId'}})
        .exec();
}

exports.findNotifiedWithoutPayment = (year, activityIds) => {
    const minDate = new Date(year + "-1-1");
    const maxDate = new Date(year + "-12-31");
    return Registration.find()
        .where('registrationDate').gte(minDate).lte(maxDate)
        .where('activityId').in(activityIds)
        .where('isEmailNotified').equals(true)
        .where('receiptNumber').gt(0)
        .where('isPaymentDone').equals(false)
        .populate({path:'activityId', populate:{path:'eventId'}})
        .sort({ activityId: 1, registrationDate: 1, lastNameChild: 1, firstNameChild: 1})
        .exec();
}

exports.filter = (year, name, firstname, receiptNr, activityId, activityIds, city) => {
    const minDate = new Date(year + "-1-1");
    const maxDate = new Date(year + "-12-31");
    let query = undefined;
    if(name && !firstname) {
        query = Registration.find({ $or: [
            {lastNameChild:  {'$regex': name, $options: 'i' }},
            {lastNameParent: {'$regex': name, $options: 'i' }},
        ]});
    }
    else if(firstname && !name) {
        query = Registration.find({ $or: [
            {firstNameChild: {'$regex': firstname, $options: 'i' }},
            {firstNameParent: {'$regex': firstname, $options: 'i' }}
        ]});
    }
    else if(name && firstname) {
        query = Registration.find({ $and: [
            { $or: [
                {lastNameChild:  {'$regex': name, $options: 'i' }},
                {lastNameParent: {'$regex': name, $options: 'i' }},
            ]},
            { $or: [
                {firstNameChild: {'$regex': firstname, $options: 'i' }},
                {firstNameParent: {'$regex': firstname, $options: 'i' }}
            ]}
        ]});
    }
    else query = Registration.find();

    if(receiptNr) query = query.where('receiptNumber').equals(receiptNr);
    if(activityId) query = query.where('activityId').equals(activityId);
    if(activityIds) query = query.where('activityId').in(activityIds);
    if(city) query = query.where('cityChild').equals(city);

    return query
        .where('registrationDate').gte(minDate).lte(maxDate)
        .populate({path:'activityId', populate:{path:'eventId'}})
        .populate({path:'userId'})
        //.sort({ activityId: 1, isPrioUp: -1, isPrioDown: 1, registrationDate: 1, lastNameChild: 1, firstNameChild: 1})
        .sort({activityId: 1, registrationDate: 1, lastNameChild: 1, firstNameChild: 1})
		.exec();
}

exports.findByFirstLastNameBirthday = (firstName, lastName, birthday) => {
    return Registration.find()
        .where('firstNameChild').equals(firstName)
        .where('lastNameChild').equals(lastName)
        .where('birthdayChild').equals(birthday)
        .populate({path:'activityId', populate:{path:'eventId'}})
        .exec();
        
}