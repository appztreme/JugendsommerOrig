'use strict';

const Registration = require('./../models/registration');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.getSelectableEventActivities = () => {

}

exports.filter = (year, name, activityId, activityIds) => {
    const minDate = new Date(year + "-1-1");
    const maxDate = new Date(year + "-12-31");
    let query = undefined;
    if(name) query = Registration.find({ $or: [
            {lastNameChild:  {'$regex': name }},
            {lastNameParent: {'$regex': name }}
        ]});
    else query = Registration.find();

    if(activityId) query = query.where('activityId').equals(activityId);
    if(activityIds) query = query.where('activityId').in(activityIds);

    return query
        .where('registrationDate').gte(minDate).lte(maxDate)
        .populate({path:'activityId', populate:{path:'eventId'}})
		.sort({ activityId: 1, registrationDate: 1, lastNameChild: 1, firstNameChild: 1})
		.exec();
}

// exports.groupByEvent = () => {
//     return Registration.aggregate([
// 			{ $match:
// 				{ $and: [ {registrationDate: { $gte: startCurYear }}, {isInternal: false} ] }
// 			},
// 			{ $group:
// 				{ _id: "$location",
// 					name: { $first: "$location" },
// 					name_it: { $first: "$location_it" },
// 					countEvents: { $sum: 1 },
// 					distinctTypes: { $addToSet: "$type"}
// 				}
// 			},
// 			{ $sort: {_id: 1}}
// 		]).exec();
// }