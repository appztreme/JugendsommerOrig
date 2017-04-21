'use strict';
const Contact = require('./../models/contact');
const Activity = require('./../models/activity');
const Event = require('./../models/event');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear+"-1-1");

exports.findById = (id) => {
    return Contact.findById(id)
			.exec();
}

exports.findAll = () => {
    return Contact.find()
        .select('_id firstName lastName type')
        .exec();
}

exports.create = (firstName, lastName, phoneNumber, email, type) => {
    let c = new Contact({
        firstName,
        lastName,
        phoneNumber,
        email,
        type
    });
    return c.save();
}

exports.search = (searchToken) => {
    return Contact.find({ $or: [
			{firstName: {'$regex': searchTerm }},
			{lastName: {'$regex': searchTerm }}
		]})
		.exec();
}

exports.findRelationsForCurrentYear = () => {
    return Activity.find()
        .populate({path: 'contactRels.contacts', populate: {path: 'eventId', populate: {path: 'contactRels.contacts'}}})
        .exec();
}