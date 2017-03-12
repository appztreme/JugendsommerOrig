'use strict';
const User = require('./../models/user');

exports.findById = (id) => {
    return User.findById(id)
			.populate('eventId', '_id name location')
			.select('_id firstName lastName userTel userEmail userName roles eventId location')
			.exec();
}

exports.search = (searchTerm) => {
	return User.find({ $or: [
			{firstName: {'$regex': searchTerm }},
			{lastName: {'$regex': searchTerm }},
			{userName: {'$regex': searchTerm }}
		]})
		.select('_id firstName lastName userName userEmail roles eventId location')
		.exec();
}