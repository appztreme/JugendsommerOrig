'use strict';
const LoanRepo = require('./../repositories/loan');
const ArticleRepo = require('./../repositories/article');

exports.findAll = async (req, res, next) => {
    try {
        const loans = await LoanRepo.find(req.query.from, req.query.to, req.query.articleId, req.query.location, req.query.lender);
        res.status(200).json(loans);
    } catch(err) {
        next(err);
    }
}

exports.create = async (req, res, next) => {
    try {
        const loan = await LoanRepo.create(req.body.articleName, req.body.location, req.body.lender, req.body.phoneNumber, req.body.from, req.body.to, req.body.start, req.body.destination, req.body.startTime, req.body.endTime, req.body.participants);
        res.status(201).json(loan);
    } catch(err) {
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const loan = await LoanRepo.findById(req.params.loanId);
        console.log("xxx", loan);
        await ArticleRepo.updateStatus(loan.articleId, 'free');
        const loanDel = await LoanRepo.delete(req.params.loanId);
        res.status(201).json(loanDel);
    } catch(err) {
        next(err);
    }
}
