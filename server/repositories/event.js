'use strict';
const Contact = require('./../models/contact');
const Event = require('./../models/event');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear+"-1-1");

exports.findByCurrentYear = () => {
    return Event.find()
			.where('startDate').gte(startCurYear)
			.sort({ location: 1, startDate: 1 })
			.exec();
}

exports.findByCurrentYearAndLocation = (location, asAdmin = false) => {
    return Event.find()
			.where('startDate').gte(startCurYear)
			.where('location').equals(location)
			.sort({ startDate: 1 })
			.exec();
    //if(!asAdmin) query = query.where('isInternal').equals(false);
    //return query.sort({ startDate: 1 }).exec();
}

exports.findByCurrentYearAndLocationSummer = (location, asAdmin = false) => {
    return Event.find()
			.where('startDate').gte(startCurYear)
       		.where('location').equals(location)
       		.where('type').in(['summer', 'music'])
			.sort({ startDate: 1 })
			.exec();
    //if(!asAdmin) query = query.where('isInternal').equals(false);
    //return query.sort({ startDate: 1 }).exec();
}

exports.findByCurrentYearAndType = (type, asAdmin = false) => {
    return Event.find()
			.where('startDate').gte(startCurYear)
			.where('type').equals(type)
			.sort({ location: 1, startDate: 1 })
			.exec();
	//if(!asAdmin) query = query.where('isInternal').equals(false)
	//return query.sort({ location: 1, startDate: 1 }).exec();
}

exports.findById = (id) => {
    return Event.findById(id);
}

exports.delete = (id) => {
    return Event.findByIdAndRemove(id);
}

exports.getContacts = (id) => {
	return Event.findById(id)
		.populate('contactRels.contact')
		.select('_id contactRels');
}

exports.groupByLocation = () => {
    return Event.aggregate([
			{ $match:
				{ $and: [ {startDate: { $gte: startCurYear }}, {isInternal: false} ] }
			},
			{ $group:
				{ _id: "$location",
					name: { $first: "$location" },
					name_it: { $first: "$location_it" },
					countEvents: { $sum: 1 },
					distinctTypes: { $addToSet: "$type"}
				}
			},
			{ $sort: {_id: 1}}
		]).exec();
}

exports.groupByLocationAdmin = () => {
    return Event.aggregate([
			{ $match:
				{ startDate: { $gte: startCurYear } }
			},
			{ $group:
				{ _id: "$location",
					name: { $first: "$location" },
					name_it: { $first: "$location_it" },
					countEvents: { $sum: 1 },
					distinctTypes: { $addToSet: "$type"}
				}
			},
			{ $sort: {_id: 1}}
		]).exec();
}

exports.groupByLocationSummer = () => {
    return Event.aggregate([
		{ $match:
			{ $and: [ {startDate: { $gte: startCurYear }}, {isInternal: false}, {type: { $in: ['summer', 'music']}} ] }
		},
		{ $group:
			{ _id: "$location",
		      name: { $first: "$location" },
  			  name_it: { $first: "$location_it" },
			  countEvents: { $sum: 1 },
			  distinctTypes: { $addToSet: "$type"}
		    }
		},
		{ $sort: {_id: 1}}
    ]).exec();
}

exports.groupByLocationSummerAdmin = () => {
    return Event.aggregate([
		{ $match:
			{ $and: [ {startDate: { $gte: startCurYear }}, {type: { $in: ['summer', 'music']}} ] }
		},
		{ $group:
			{ _id: "$location",
		      name: { $first: "$location" },
  			  name_it: { $first: "$location_it" },
			  countEvents: { $sum: 1 },
			  distinctTypes: { $addToSet: "$type"}
		    }
		},
		{ $sort: {_id: 1}}
    ]).exec();
}

exports.groupByType = () => {
    return Event.aggregate([
		{ $match:
			{ $and: [ {startDate: { $gte: startCurYear }}, {isInternal: false}, {type: { $nin: ['summer', 'music']}} ] }
		},
		{ $group:
			{ _id: "$type",
			  name: { $first: "$type" },
			  name_it: { $first: "$type" },
			  countEvents: { $sum: 1 },
			  distinctTypes: { $addToSet: "$type"}
		    }
		},
		{ $sort: {_id: 1}}
    ]).exec();
}

exports.groupByTypeAdmin = () => {
    return Event.aggregate([
		{ $match:
			{ $and: [ {startDate: { $gte: startCurYear }}, {type: { $nin: ['summer', 'music']}} ] }
		},
		{ $group:
			{ _id: "$type",
			  name: { $first: "$type" },
			  name_it: { $first: "$type" },
			  countEvents: { $sum: 1 },
			  distinctTypes: { $addToSet: "$type"}
		    }
		},
		{ $sort: {_id: 1}}
    ]).exec();
}