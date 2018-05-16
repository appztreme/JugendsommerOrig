'use strict';
const auth = require('./authentication');
const RegistrationController = require('./../controller/registrationCtrl');
const router = require('express').Router();

router.post('/payment', auth.requiresRole('admin'), RegistrationController.sendPaymentMail);

router.post('/reminder', auth.requiresRole('admin'), RegistrationController.sendReminderMail);

module.exports = router;