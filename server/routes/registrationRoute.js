'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const RegistrationController = require('./../controller/registrationCtrl');

//router.get('/', RegistrationController.find);
router.get('/', auth.requiresOneRoleOutOf(["admin", "fadmin", "ladmin"]), RegistrationController.find);

router.get('/overview', auth.requiresRole("admin"), RegistrationController.overview);

router.get('/selectableEventActivities', RegistrationController.getSelectableEventActivities);

router.get('/children/:eventId', auth.requiresRole("admin"), RegistrationController.getChildrenPerEvent);

router.get('/:registrationId', auth.requiresApiLogin, RegistrationController.findById);

router.delete('/:registrationId', auth.requiresRole("admin"), RegistrationController.delete);

router.post('/', auth.requiresApiLogin, RegistrationController.create);

router.get('/send/singlereceipt/:registrationId', auth.requiresRole('admin'), RegistrationController.sendSinglePaymentMail);

router.get('/send/receipts/:eventId', auth.requiresRole('admin'), RegistrationController.sendPaymentMail);

router.get('/resend/receipt/:receiptNumber', auth.requiresRole('admin'), RegistrationController.resendSinglePaymentMail);

router.get('/send/reminder/:eventId', auth.requiresRole('admin'), RegistrationController.sendReminderMail);

router.get('/send/confirmation/:eventId', auth.requiresRole('admin'), RegistrationController.sendConfirmationMail);

router.post('/send/confirmationSingle', auth.requiresRole("admin"), RegistrationController.sendConfirmationMailSingle);

router.put('/', auth.requiresApiLogin, RegistrationController.update);

router.patch('/updateIsPaymentDone', auth.requiresRole("admin"), RegistrationController.updateIsPaymentDone);

router.patch('/updateIsEmailNotified', auth.requiresRole("admin"), RegistrationController.updateIsEmailNotified);

router.patch('/updateProp', auth.requiresRole("admin"), RegistrationController.updateProperty);

module.exports = router;
