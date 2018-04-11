'use strict';
const LoanRepo = require('./../repositories/loan');

exports.findAllByDateRange = async (req, res, next) => {
    console.log(req.params);
    try {
        const loans = await LoanRepo.findAllByDateRange(new Date(req.params.from), new Date(req.params.to));
        res.status(200).json(loans);
    } catch(err) {
        next(err);
    }
}

exports.create = async (req, res, next) => {
    try {
        const loan = await LoanRepo.create(req.body.articleName, req.body.location, req.body.lender, req.body.phoneNumber, req.body.from, req.body.to);
        res.status(201).json(loan);
    } catch(err) {
        next(err);
    }
}