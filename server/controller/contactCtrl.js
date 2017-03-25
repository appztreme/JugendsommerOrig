'use strict';

const contactRepo = require('./../repositories/contact');

exports.create = async(req, res, next) => {
    try {
        let c = await contactRepo.save(req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email, req.body.type);
        res.json(c);
    }
    catch(err) { next(err); }
}

exports.update = async(req, res, next) => {
    try {
        let cOrig = await contactRepo.findById(req.body.id);
        cOrig.firstName = req.body.firstName;
        cOrig.lastName = req.body.lastName;
        cOrig.email = req.body.email;
        cOrig.phoneNumber = req.body.phoneNumber;
        cOrig.type = req.body.type;
        let cNew = await cOrig.save();
        res.json(cNew);
    }
    catch(err) { next(err); }
}

exports.findById = async(req, res, next) => {
    try {
        let contact = await contactRepo.findById(req.params.id);
        res.json(contact);
    }
    catch(err) { next(err); }
}

exports.search = async(req, res, next) => {
    try {
        let result = await contactRepo.search(req.params.txt);
        res.json(result);
    }
    catch(err) { next(err); }
}