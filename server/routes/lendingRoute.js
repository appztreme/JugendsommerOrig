'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const LendingController = require('./../controller/lendingCtrl');

router.get('/date', auth.requiresRole("fadmin"), LendingController.findByDate);
router.get('/dateAndUser', auth.requiresRole("fadmin"), LendingController.findByDateAndUser);
router.get('/user', auth.requiresRole("fadmin"), LendingController.findByUser);
router.post('/', auth.requiresRole("fadmin"), LendingController.create);

module.exports = router;
