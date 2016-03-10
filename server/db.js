'use strict';

var mongoose = require('mongoose');

if(process.env.NODE_ENV === 'test') {
	mongoose.connect('mongodb://localhost/jugendsommer_test', function() {
		console.log('mongodb connected to test instance');
	});
}
else {
	mongoose.connect('mongodb://localhost/jugendsommer_test', function() {
		console.log('mongodb connected to test');
	});
}

module.exports = mongoose;
