'use strict';
const auth = require('./authentication');
const router = require('express').Router();

router.post('/', auth.requiresApiLogin, function(req, res, next) {
	req.logout();
	res.end();
});

module.exports = router;
