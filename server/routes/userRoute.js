'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const UserController = require('./../controller/userCtrl');

router.post('/', UserController.create);

router.get('/:id', UserController.findById);

router.get('/search/:txt', auth.requiresRole("admin"), UserController.search);

router.post('/updateRoles', auth.requiresRole("admin"), UserController.updateRoles);

router.post('/updatePwd', UserController.updatePwd);

router.post('/requestUserToken', UserController.requestUserToken);

module.exports = router;
