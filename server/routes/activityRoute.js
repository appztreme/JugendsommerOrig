'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const ActivityController = require('./../controller/activityCtrl');

router.get('/', ActivityController.find);

router.get('/:activityId', ActivityController.findById);

router.post('/', auth.requiresRole("admin"), ActivityController.create);

router.put('/', auth.requiresRole("admin"), ActivityController.update);

module.exports = router;
