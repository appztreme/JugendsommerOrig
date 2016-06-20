'use strict';
const Lending = require('./../models/lending');
const Resource = require('./../models/resource');

exports.findByDate = (req, res, next) => {
  Lending.find()
    .where('date').equals(req.query.date)
    .populate('resourceId')
    .populate('eventId')
    .exec((err, lendings) => {
      if(err) { return next(err); }
      res.json(lendings);
    });
};

exports.findByDateAndUser = (req, res, next) => {
  Lending.find()
    .where('date').equals(req.query.date)
    .where('userId').equals(req.query.userId)
    .populate('resourceId')
    .populate('eventId')
    .sort({ date: 1 })
    .exec((err, lendings) => {
      if(err) { return next(err); }
      res.json(lendings);
    });
};

exports.findByUser = (req, res, next) => {
  Lending.find()
    .where('userId').equals(req.query.userId)
    .populate('resourceId')
    .populate('eventId')
    .sort({ date: 1 })
    .exec((err, lendings) => {
      if(err) { return next(err); }
      res.json(lendings);
    });
};

exports.create = (req, res, next) => {
  Resource.find()
    .where('type').equals(req.body.type)
    .exec((err, resources) => {
      if(err) { return next(err); }
        Lending.find({resourceId: {$in: resources}, date: req.body.date})
        .select({_id: 0, resourceId: 1})
        .exec((err2, lendings) => {
          if(err2) { return next(err2); }
          let resource2BookId = undefined;
          var reducedL = lendings.map(a => a.resourceId.toString());
          resources.forEach(res => {
            if(reducedL.indexOf(res._id.toString()) === -1) {
              resource2BookId = res._id;
              return;
            }
          });
          if(resource2BookId) {
              let newLending = new Lending({
                eventId: req.body.eventId,
                userId: req.body.userId,
                resourceId: resource2BookId,
                date: req.body.date
              });
              newLending.save((err3, l) => {
                if(err3) { return next(err3); }
                res.status(201).json(l);
              });
          } else {
            res.status(409).json({message: 'Alle Materialien dieses Types sind schon gebucht.'});
          }
        });
    });
};
