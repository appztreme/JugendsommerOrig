printjson(
    db.registrations
        .aggregate([
            { "$group": 
                { "_id": { firstName: "$firstNameChild", lastName: "$lastNameChild", size: "$tShirtSize" }}
            },
            { $sort: {lastNameChild:1, firstNameChild: 1} }
        ])
        .toArray()
        .map( function(v) { return v._id } )
);