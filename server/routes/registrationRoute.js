'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const RegistrationController = require('./../controller/registrationCtrl');

router.get('/', auth.requiresRole("admin"), RegistrationController.find);

router.get('/selectableEventActivities', RegistrationController.getSelectableEventActivities);

router.get('/:registrationId', auth.requiresRole("admin"), RegistrationController.findById);

router.delete('/:registrationId', auth.requiresRole("admin"), RegistrationController.delete);

router.post('/', auth.requiresApiLogin, RegistrationController.create);

router.put('/', auth.requiresRole("admin"), RegistrationController.update);

router.patch('/updateIsPaymentDone', auth.requiresRole("admin"), RegistrationController.updateIsPaymentDone);

router.patch('/updateIsEmailNotified', auth.requiresRole("admin"), RegistrationController.updateIsEmailNotified);

module.exports = router;
