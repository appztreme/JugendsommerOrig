'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const PresenceController = require('./../controller/presenceCtrl');

router.get('/:activityId', PresenceController.findByActivityId);
router.post('/updateIsPresent', PresenceController.updateIsPresent);

module.exports = router;