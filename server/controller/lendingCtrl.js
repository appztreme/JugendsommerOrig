'use strict';
const Lending = require('./../models/lending');
const Resource = require('./../models/resource');

exports.findByDate = (req, res, next) => {
  Lending.find()
    .where('date').equals(req.query.date)
    .exec((err, lendings) => {
      if(err) { return next(err); }
      res.json(lendings);
    });
};

exports.findByDateAndUser = (req, res, next) => {
  Lending.find()
    .where('date').equals(req.query.date)
    .where('userId').equals(req.query.userId)
    .sort({ date: 1 })
    .exec((err, lendings) => {
      if(err) { return next(err); }
      res.json(lendings);
    });
};

exports.findByUser = (req, res, next) => {
  Lending.find()
    .where('userId').equals(req.query.userId)
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
        Lending.find({resourceId: {$in: resources}})
        .exec((err2, lendings) => {
          if(err2) { return next(err2); }
          let resource2BookId = undefined;
          lendings.forEach(lend => {
            if(lend.date !== req.body.date) {
              resource2BookId = lend.resourceId;
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
            res.status(409).send({message: 'Alle Materialien dieses Types sind schon gebucht.'});
          }
        });
    });
};
