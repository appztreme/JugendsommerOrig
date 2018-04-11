'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const LoanController = require('./../controller/loanCtrl');

// router.get('/', ArticleController.find);

// router.get('/type/:type', ArticleController.findByType);

// router.get('/overview', ArticleController.findOverview);

router.get('/byDateRange/:from/:to', LoanController.findAllByDateRange);

router.post('/', LoanController.create);

// router.put('/', auth.requiresRole("admin"), ArticleController.update);

// router.delete('/:id', auth.requiresRole("admin"), ArticleController.remove)

// router.patch('/status', ArticleController.updateStatus);

module.exports = router;