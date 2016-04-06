var express = require('express');
var expect = require('chai');
var eventCtrl = require('../../../../server/controller/api/events');
var app = require('../../../../app');
var request = require('supertest')(app);
var router = express.Router();


describe.skip('server.controllers.api.events', function() {
	it.skip('base', function(done) {
		console.log(app);
	});

	it.skip('GET events', function(done) {
		request
			.get('/')
			.expect(200);
	/*
			.end(function(err, events) {
				expects(err).not.exist;
				done();
			});
			*/
	});
});
