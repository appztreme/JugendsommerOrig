'use strict';
const router = require('express').Router();
const auth = require('./authentication');

router.post('/', auth.authenticate);

module.exports = router;
