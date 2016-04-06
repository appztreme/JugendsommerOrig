'use strict';
const router = require('express').Router();
const UserController = require('./../controller/userCtrl');

router.post('/', UserController.create);

router.get('/:id', UserController.findById);

router.post('/updatePwd', UserController.updatePwd);

router.post('/requestUserToken', UserController.requestUserToken);

module.exports = router;
