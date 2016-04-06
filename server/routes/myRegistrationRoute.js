'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const MyRegistrationController = require('./../controller/myRegistrationCtrl');

router.get('/:userId', auth.requiresApiLogin, MyRegistrationController.find);

module.exports = router;
