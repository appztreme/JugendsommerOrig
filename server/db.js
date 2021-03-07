'use strict';
var mongoose = require('mongoose');
var config = require('./../config');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === 'test') {
	mongoose.connect(config.db_test, { useNewUrlParser: true, useUnifiedTopology: true }, function() {
		console.log('mongodb connected to test instance');
	});
}
else if(process.env.NODE_ENV === 'integration') {
	mongoose.connect('mongodb://localhost/kiso_integration', { useNewUrlParser: true, useUnifiedTopology: true }, function() {
		console.log('mongodb connected to integration instance');
	});
}
else {
	mongoose.connect(config.db_prod, { useNewUrlParser: true, useUnifiedTopology: true }, function() {
		console.log('mongodb connected to production');
	});
}

module.exports = mongoose;
