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
    return Event.aggregate([
        { $match:
			{ $and: [ {startDate: { $gte: startCurYear }} ] }
		},
        { $lookup:
            { from: 'activities', localField: '_id', foreignField: 'eventId', as: 'activities' }
        },
        // { $unwind: '$activities.contactRels' },
        // { $lookup:
        //     { from: 'contacts', localField: 'activities.contactRels.contact', foreignField: '_id', as: 'activities.contactRels.cont' }
        // },
        { $unwind: '$contactRels' },
        { $lookup:
            { from: 'contacts', localField: 'contactRels.contact', foreignField: '_id', as: 'contactRels.cont' }
        },
        { $project:
            {
                _id: 0,
                eventName: { $concat: ["location", " ", "name"] },
                "contactRels.contact": { $arrayElemAt: ["$contactRels.cont",0] },
                "activities._id": 1,
                "activities.name": 1,
                "activities.contactRels": 1
            }
        },
        // { $lookup:
        //     { from: 'contacts', localField: 'contactRels.contact', foreignField: '_id', as: 'c' }
        // }
    ]).exec();
    // return Activity.find()
    //     .where('startDate').gte(startCurYear)
    //     .populate('contactRels.contact')
    //     .populate({ path: 'eventId', select: 'location name contactRels', populate:{ path: 'contactRels.contact' } })
    //     .select('eventId name contactRels')
    //     .exec();
}