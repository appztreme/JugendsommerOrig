'use strict';
const auth = require('./authentication');
const RegistrationController = require('./../controller/registrationCtrl');
const router = require('express').Router();

router.post('/payment', auth.requiresRole('admin'), RegistrationController.sendPaymentMail);

module.exports = router;