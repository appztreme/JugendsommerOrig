'use strict';
const User = require('./../models/user');

exports.findById = (id) => {
    return User.findOne({_id: id})
			.populate('eventId', '_id name location')
			.select('_id firstName lastName userTel userEmail userName roles eventId')
			.exec();
}