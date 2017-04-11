'use strict';
const router = require('express').Router();
const auth = require('./authentication');
const EventController = require('./../controller/eventCtrl');

router.get('/', EventController.findByCurrentYear);

router.get('/selection', EventController.getGeoSelection);

router.get('/asAdmin/selection', auth.requiresRole("admin"), EventController.getGeoSelectionAdmin);

router.get('/selection/summer', EventController.getGeoSelectionSummer);

router.get('/asAdmin/selection/summer', auth.requiresRole("admin"), EventController.getGeoSelectionSummerAdmin);

router.get('/selection/type', EventController.getTypeSelection);

router.get('/asAdmin/selection/type', auth.requiresRole("admin"), EventController.getTypeSelectionAdmin);

router.get('/location/:location', EventController.findByCurrentYearAndLocation);

router.get('/type/:type', EventController.findByCurrentYearAndType);

router.get('/location/summer/:location', EventController.findByCurrentYearAndLocationSummer);

router.get('/typeByActivity/:activityId', EventController.getTypeByActivity);

router.get('/asAdmin/location/:location', auth.requiresRole("admin"), EventController.findByCurrentYearAndLocationAdmin);

router.get('/asAdmin/location/summer/:location', auth.requiresRole("admin"), EventController.findByCurrentYearAndLocationSummerAdmin);

router.get('/asAdmin/type/:type', auth.requiresRole("admin"), EventController.findByCurrentYearAndTypeAdmin);

router.get('/contacts/:eventId', EventController.getContactsForEvent);

router.get('/:eventId', EventController.findByEventId);

router.post('/', auth.requiresRole("admin"), EventController.create);

router.put('/', auth.requiresRole("admin"), EventController.update);

router.delete('/', auth.requiresRole("admin"), EventController.delete);

router.patch('/contacts/add', auth.requiresRole("admin"), EventController.addContact);

router.patch('/contacts/remove', auth.requiresRole("admin"), EventController.removeContact);

module.exports = router;
