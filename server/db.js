'use strict';
var mongoose = require('mongoose');
var config = require('./../config');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === 'test') {
	mongoose.connect(config.db_test, function() {
		console.log('mongodb connected to test instance');
	});
}
else {
	mongoose.connect(config.db_prod, function() {
		console.log('mongodb connected to production');
	});
}

module.exports = mongoose;
