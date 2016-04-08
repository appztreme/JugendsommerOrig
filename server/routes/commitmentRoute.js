'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const CommitmentController = require('./../controller/commitmentCtrl');

router.get('/', auth.requiresRole("admin"), CommitmentController.find);

router.get('/selectableEventActivities', CommitmentController.getSelectableEvents);

router.get('/:commitmentId', auth.requiresRole("fadmin"), CommitmentController.findById);

router.delete('/:commitmentId', auth.requiresRole("admin"), CommitmentController.delete);

router.post('/', auth.requiresRole("fadmin"), CommitmentController.create);

router.put('/', auth.requiresRole("fadmin"), CommitmentController.update);

module.exports = router;
