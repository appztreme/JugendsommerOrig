import { isValidObjectId } from "mongoose";

printjson(
    db.registrations
        .aggregate([
            //{ "$match": { "activityId.eventId.isInternal": false }},
            { "$group": 
                { "_id": { firstName: "$firstNameChild", lastName: "$lastNameChild", size: "$tShirtSize", activityId: "$activityId" }}
            },
            { $sort: {lastNameChild:1, firstNameChild: 1} }
        ])
        .toArray()
        .map( function(v) { return v._id } )
);

printjson(
    db.registrations.find({ 'activityId.eventId._id': new ObjectId("5ec23b83ae0a7706551d7ed4") }.populate('eventId', '_id name location'))
)