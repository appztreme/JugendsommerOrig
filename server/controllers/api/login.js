var User = require('../../models/user');
var passport = require('passport');
var router = require('express').Router();
var auth = require('./authentication');

router.post('/', auth.authenticate);

module.exports = router;
