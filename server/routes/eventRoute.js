'use strict';
const router = require('express').Router();
const auth = require('./authentication');
const EventController = require('./../controller/eventCtrl');

router.get('/', EventController.findByCurrentYear);

router.get('/selection', EventController.getGeoSelection);

router.get('/location/:location', EventController.findByCurrentYearAndLocation);

router.get('/type/:type', EventController.findByCurrentYearAndType);

router.get('/typeByActivity/:activityId', EventController.getTypeByActivity);

router.get('/asAdmin/location/:location', auth.requiresRole("admin"), EventController.findByCurrentYearAndLocationAdmin);

router.get('/:eventId', EventController.findByEventId);

router.post('/', auth.requiresRole("admin"), EventController.create);

router.put('/', auth.requiresRole("admin"), EventController.update);

router.delete('/', auth.requiresRole("admin"), EventController.delete);

module.exports = router;
