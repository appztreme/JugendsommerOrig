'use strict';
const mongoose = require('mongoose');
var config = require('./../config');

mongoose.Promise = global.Promise;

// if(process.env.NODE_ENV === 'test') {
// 	mongoose.connect(config.shop_test, function() {
// 		console.log('mongodb connected to shop test instance');
// 	});
// }
// else {
// 	mongoose.connect(config.shop_prod, function() {
// 		console.log('mongodb connected shop to production');
// 	});
// }

module.exports = mongoose.createConnection(config.shop_prod);;