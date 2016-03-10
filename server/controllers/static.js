'use strict';

var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../../public/templates'));
router.use(express.static(__dirname + '/../../public/templates/partials'));

router.get('/', function(req, res) {
	res.sendFile('public/index.html', { root: __dirname + '/../..'});
});


module.exports = router;
