'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const MyRegistrationController = require('./../controller/myRegistrationCtrl');

router.get('/:userId', auth.requiresApiLogin, MyRegistrationController.find);

router.delete('/:registrationId', auth.requiresApiLogin, MyRegistrationController.delete);

router.post('/confirmation', auth.requiresApiLogin, MyRegistrationController.getConfirmation);


module.exports = router;
