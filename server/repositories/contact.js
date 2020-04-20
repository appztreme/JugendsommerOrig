'use strict';
const Contact = require('./../models/contact');
const Activity = require('./../models/activity');
const Event = require('./../models/event');

const curYear = new Date().getFullYear();
const startCurYear = new Date(curYear+"-1-1");

exports.findById = (id) => {
    return Contact.findById(id).exec();
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

const getAmountForRole = (role) => {
    switch(role) {
        case 'TeamleiterIn': return 475;
        case 'TeamleiterIn 24h': return 575;
        case 'TeamleiterIn 0.5': return 440;
        case 'TeamleiterIn 24h 0.5': return 540;
        case 'BetreuerIn': return 400;
        case 'BetreuerIn 24h': return 500;
        case 'PraktikantIn': return 200;
        case 'PraktikantIn 24h': return 300;
        case 'Andere': return 0;
        default: return 0;
    }
}

const relationComparer = (a, b) => {
    if(a.lastName < b.lastName) return -1;
    if(a.lastName > b.lastName) return 1;
    if(a.firstName > b.firstName) return -1;
    if(a.firstName < b.firstName) return 1;
    if(a.startDate > b.startDate) return 1;
    if(a.startDate < b.startDate) return -1;
    return 0;
}

exports.findRelationsForCurrentYear = async () => {
    let result = [];

    const eventContactRels = await Event.find()
        .where('startDate').gte(startCurYear)
        .populate({ path: 'contactRels.contact' })
        .select('name location contactRels startDate endDate')
        .exec();
    const activityContactRels = await Activity.find()
        .where('startDate').gte(startCurYear)
        .populate({ path: 'contactRels.contact' })
        .populate({ path: 'eventId', select: 'location name' })
        .select('name contactRels eventId startDate endDate')
        .exec();
    eventContactRels.forEach(v => {
        v.contactRels.forEach(vC => {
            result.push({
                eventName: v.location + ' ' + v.name,
                activityName: '',
                type: vC.role,
                amount: getAmountForRole(vC.role),
                firstName: vC.contact.firstName,
                lastName: vC.contact.lastName,
                email: vC.contact.email,
                phoneNumber: vC.contact.phoneNumber,
                startDate: v.startDate,
                endDate: v.endDate
            });
        })
    })
    activityContactRels.forEach(v => {
        v.contactRels.forEach(vC => {
            result.push({
                eventName: v.eventId.location + ' ' + v.eventId.name,
                activityName: v.name,
                type: vC.role,
                amount: getAmountForRole(vC.role),
                firstName: vC.contact.firstName,
                lastName: vC.contact.lastName,
                email: vC.contact.email,
                phoneNumber: vC.contact.phoneNumber,
                startDate: v.startDate,
                endDate: v.endDate
            })
        })
    })
    return result.sort(relationComparer);
}