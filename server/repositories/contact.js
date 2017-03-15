'use strict';
const Contact = require('./../models/contact');

exports.findById = (id) => {
    return Contact.findById(id)
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