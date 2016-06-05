'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const CommitmentController = require('./../controller/commitmentCtrl');

router.get('/', auth.requiresRole("admin"), CommitmentController.find);

router.get('/selectableEvents', CommitmentController.getSelectableEvents);

router.get('/summary', auth.requiresRole("admin"), CommitmentController.getSummary);

router.get('/:commitmentId', auth.requiresRole("fadmin"), CommitmentController.findById);

router.get('/byUser/:userId', auth.requiresRole("fadmin"), CommitmentController.findByUserId);

router.get('/byEvent/:eventId', auth.requiresRole("admin"), CommitmentController.findByEventId);

router.delete('/:commitmentId', auth.requiresRole("admin"), CommitmentController.delete);

router.post('/', auth.requiresRole("fadmin"), CommitmentController.create);

router.put('/', auth.requiresRole("fadmin"), CommitmentController.update);

module.exports = router;
