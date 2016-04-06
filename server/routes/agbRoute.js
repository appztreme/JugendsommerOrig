'use strict';
const AgbController = require('./../controller/agbCtrl');
const router = require('express').Router();

router.get('/', AgbController.find);

router.put('/', AgbController.update);

module.exports = router;
