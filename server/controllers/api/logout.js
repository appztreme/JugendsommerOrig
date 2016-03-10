var User = require('../../models/user');
var passport = require('passport');
var auth = require('./authentication');
var router = require('express').Router();

router.post('/', auth.requiresApiLogin, function(req, res, next) {
	req.logout();
	res.end();
});

module.exports = router;

