'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const LoanController = require('./../controller/loanCtrl');

router.get('/search', LoanController.findAll);

router.post('/', LoanController.create);

router.delete('/:loanId', LoanController.delete);

module.exports = router;
