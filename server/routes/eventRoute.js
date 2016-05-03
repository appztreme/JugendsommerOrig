'use strict';
const router = require('express').Router();
const auth = require('./authentication');
const EventController = require('./../controller/eventCtrl');

router.get('/', EventController.findByCurrentYear);

router.get('/:eventId', EventController.findByEventId);

router.post('/', auth.requiresRole("admin"), EventController.create);

router.put('/', auth.requiresRole("admin"), EventController.update);

router.delete('/', auth.requiresRole("admin"), EventController.delete);

module.exports = router;
