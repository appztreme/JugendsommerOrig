'use strict';

const Registration = require('./../models/registration');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear,1,1);

exports.getSelectableEventActivities = () => {

}

exports.filter = (year, name, activityId, eventId) => {
    const minDate = new Date(year + "-1-1");
    const maxDate = new Date(year + "-12-31");
    let query = Registration.find();
    // if(name) query = query.or([
    //     {lastNameChild:  {'$regex': { name }}},
    //     {lastNameParent: {'$regex': { name }}}
    // ]);   
    if(activityId) query = query.where('activityId').equals(activityId);
    //if(name) query = query.where('lastNameChild').regex(name);
    if(eventId) query = query.populate({path:'activityId', populate:{path:'eventId', match:{ _id: eventId }}});
    else query = query.populate({path:'activityId', populate:{path:'eventId'}});

    return query
        .where('registrationDate').gte(minDate).lte(maxDate)
		.sort({ activityId: 1, registrationDate: 1, lastNameChild: 1, firstNameChild: 1})
		.exec();
}