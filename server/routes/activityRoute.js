'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const ActivityController = require('./../controller/activityCtrl');

router.get('/', ActivityController.find);

router.get('/:activityId', ActivityController.findById);

router.get('/contacts/:activityId', auth.requiresRole("admin"), ActivityController.getContactsForActivity);

router.post('/', auth.requiresRole("admin"), ActivityController.create);

router.put('/', auth.requiresRole("admin"), ActivityController.update);

router.patch('/contacts/add', auth.requiresRole("admin"), ActivityController.addContact);

router.patch('/contacts/remove', auth.requiresRole("admin"), ActivityController.removeContact);

module.exports = router;
