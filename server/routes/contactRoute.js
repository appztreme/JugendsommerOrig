'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const ContactController = require('./../controller/contactCtrl');

router.post('/', auth.requiresRole("admin"), ContactController.create);

router.put('/', auth.requiresRole("admin"), ContactController.update);

router.get('/', auth.requiresRole("admin"), ContactController.findAll);

router.get('/:id', auth.requiresRole("admin"), ContactController.findById);

router.get('/search/:txt', auth.requiresRole("admin"), ContactController.search);

module.exports = router;