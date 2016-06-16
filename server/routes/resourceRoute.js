'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const ResourceController = require('./../controller/resourceCtrl');

router.get('/types', auth.requiresRole("fadmin"), ResourceController.getTypes);

module.exports = router;
