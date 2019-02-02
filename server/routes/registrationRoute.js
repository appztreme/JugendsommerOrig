'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const RegistrationController = require('./../controller/registrationCtrl');

router.get('/', auth.requiresOneRoleOutOf(["admin", "fadmin", "ladmin"]), RegistrationController.find);

router.get('/selectableEventActivities', RegistrationController.getSelectableEventActivities);

router.get('/:registrationId', auth.requiresApiLogin, RegistrationController.findById);

router.delete('/:registrationId', auth.requiresRole("admin"), RegistrationController.delete);

router.post('/', auth.requiresApiLogin, RegistrationController.create);

router.get('/send/receipts/:eventId', auth.requiresRole('admin'), RegistrationController.sendPaymentMail);

router.get('/send/reminder/:eventId', auth.requiresRole('admin'), RegistrationController.sendReminderMail);

router.put('/', auth.requiresApiLogin, RegistrationController.update);

router.patch('/updateIsPaymentDone', auth.requiresRole("admin"), RegistrationController.updateIsPaymentDone);

router.patch('/updateIsEmailNotified', auth.requiresRole("admin"), RegistrationController.updateIsEmailNotified);

router.patch('/updateProp', auth.requiresRole("admin"), RegistrationController.updateProperty);

module.exports = router;
