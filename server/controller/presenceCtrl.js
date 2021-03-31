'use strict';
const Presence = require('./../models/presence');

exports.findByActivityId = async(req, res, next) => {
	try {
		let p  = await Presence.find({})
            .populate({path:'registrationId'})
            .where('registrationId.activityId').equals(req.query.activityId)
            .exec();
		return res.json(p);
	} catch(err) { return next(err); }
}

exports.updateIsPresent = (req, res, next) => {
    if(req.body._id) {
        Presence.findById(req.body._id, function(err, pres) {
            pres.isPresent = req.body.isPresent;
            pres.save(function(err, presDb) {
                if(err) { return next(err); }
                res.status(201).json(presDb);
            });
        });
    } else {
        var pres = new Presence({
            registrationId: req.body.registrationId,
            date: req.body.date,
            isPresent: req.body.isPresent
        });
        pres.save(function(errNew, presNew) {
            if(errNew) { return next(errNew); }
            //console.log(presNew, errNew);
            res.status(201).json(presNew);
        });
    }	
};