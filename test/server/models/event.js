var expect = require('chai').expect;
var mongoose = require('../../../server/db');
var Event = require('../../../server/models/event');
var util = require('./testutil');

function createEvent(name, number) {
	return new Event({
		name: 'Test' + name +  number.toString(),
		description: 'Description of Test' + name + number.toString(),
	        startDate: new Date(),
	        endDate: new Date(),
	        visibleFrom: new Date(),
	        visibleTo: new Date(),
	        info: 'Information for Test' + name + number.toString()
	});
}

describe('server.models.event', function() {

	before(function() {
		expect(process.env.NODE_ENV).to.equal('test');
		var ev = new Event();
		expect(ev.db.name).to.equal('jugendsommer_test');
	});
	
	after(function(done) {
		util.clearDB(done);
		return done();
	});

	describe('when a new valid event is created', function() {
		it('schema validation has no errors', function() {
			var ev = createEvent('Event', 1); 
			expect(ev.errors).to.be.undefined;
			expect(ev.name).to.equal('TestEvent1');
		});

		it('default values are set', function() {
			var ev = new Event();
			expect(ev.visibleFrom.Year).to.equal(new Date().Year);
			expect(ev.visibleFrom.Month).to.equal(new Date().Month);
			expect(ev.visibleFrom.Day).to.equal(new Date().Day);
			expect(ev.visibleTo.Year).to.equal(new Date().Year);
			expect(ev.visibleTo.Month).to.equal(new Date().Month);
			expect(ev.visibleTo.Day).to.equal(new Date().Day);
		});
	});

	describe('when a new event is saved', function() {

		it('all properties are correct', function(done) {
			var ev = createEvent('Save', 1);
			ev.save(function(err, evDb) {
				expect(util.compareModels(evDb, ev)).to.be.true;
				done();
			});
		});

		it('can be queried', function(done) {
			var ev = createEvent('Save', 3);
			var evSaved = undefined;
			ev.save(function(err, evDb) {
				evSaved = evDb;
				Event.findById(evSaved._id, function(err, evDb) {
					expect(util.compareModels(evSaved, evDb)).to.be.true;
					done();
				});
			});
		});
	});
});
