var expect = require('chai').expect;
var mongoose = require('../../../server/db');
var Event = require('../../../server/models/event');
var Activity = require('../../../server/models/activity');
var Registration = require('../../../server/models/registration');
var util = require('./testutil');

function createRegistration(nameP, nameC, number, activityId) {
	return new Registration({
		firstNameParent: 'FirstName_' + nameP + number.toString(),
		lastNameParent: 'SecondName_' + nameP + number.toString(),
    	phoneNumberParent: '123/456-789',
    	emailParent: nameP + '@provider.it',
		firstNameChild: 'FirstName_' + nameC + number.toString(),
   		lastNameChild: 'SecondName_' + nameC + number.toString(),
		birthdayChild: new Date(),
   		schoolChild: 'alle Klassen',
   		healthChild: '-',
   		nameContact1: 'NameContact1_' + nameC + number.toString(),
   		telContact1: 'TelContact1_' + nameC + number.toString(),
   		nameContact2: 'NameContact2_' + nameC + number.toString(),
   		telContact2: 'TelContact2_' + nameC + number.toString(),
   		activityId: activityId
	});
}

function createEvent(done) {
	var ev = new Event({
		name: 'RegistrationEvent',
	    description: 'Description of RegistrationEvent',
	    startDate: new Date(),
	    endDate: new Date(),
	    visibleFrom: new Date(),
	    visibleTo: new Date(),
	    info: 'Information of RegistrationEvent'
	});
	ev.save(function(err, evDb) {
		eventId = evDb._id;
		createActivity1(eventId, done);
	});
}

function createActivity1(eventId, done) {
	var act = new Activity({
		name: 'RegistrationActivity',
		description: 'Description of RegistrationActivity',
		startDate: new Date(),
		endDate: new Date(),
    	eventId: eventId,
		maxParticipants: 5,
   		curParticipants: 0,
    	queueSize: 2
	});
	act.save(function(err, actDb) {
		activity1Id = actDb._id;
		createActivity2(eventId, done);
	});
}

function createActivity2(eventId, done) {
	var act = new Activity({
		name: 'RegistrationActivity2',
		description: 'Description of RegistrationActivity',
		startDate: new Date(),
		endDate: new Date(),
    	eventId: eventId,
		maxParticipants: 5,
   		curParticipants: 0,
    	queueSize: 2
	});
	act.save(function(err, actDb) {
		activity2Id = actDb._id;
		return done();
	});
}

var eventId = undefined;
var activity1Id = undefined;
var activity2Id = undefined;

describe('server.models.registration', function() {

	before(function(done) {
		expect(process.env.NODE_ENV).to.equal('test');
		var ev = new Event();
		expect(ev.db.name).to.equal('jugendsommer_test');

		createEvent(done);
	});
	
	after(function(done) {
		util.clearDB(done);
		return done();
	});

	
	describe('when a new valid registration is created', function() {
		it('schema validation has no errors', function() {
			var reg = createRegistration('Parent', 'Child', 1, activity1Id); 
			expect(reg.errors).to.be.undefined;
		});
	});

	describe('when a new registration is saved', function() {

		it('all properties are correct', function(done) {
			var reg = createRegistration('Parent', 'Child', 2, activity1Id);
			reg.save(function(err, regDb) {
				expect(util.compareModels(regDb, reg)).to.be.true;
				done();
			});
		});

		it('can be queried', function(done) {
			var reg = createRegistration('Parent', 'Child', 3, activity1Id);
			reg.save(function(err, regDb) {
				Registration.findById(regDb._id, function(err, regQueryDb) {
					expect(util.compareModels(regDb, regQueryDb)).to.be.true;
					done();
				});
			});
		});

		it('related Activity.curParticipants is updated', function(done) {
			var reg = createRegistration('Parent', 'Child', 4, activity1Id);
			Activity.findById(activity1Id, function(err, act1) {
				reg.save(function(err, regDb) {
					setTimeout(function() {
					Activity.findById(activity1Id, function(err, act2) {
						expect(act2.curParticipants).to.equal(act1.curParticipants + 1);
						done();
					});
					}, 10);
				});
			});
		});
	});

	describe('when a registration is deleted', function() {
		it('related Activity.curParticipants is updated', function(done) {
			var reg = createRegistration('Parent', 'Child', 5, activity1Id);
			var regid = reg._id;
			Activity.findById(activity1Id, function(err, act1) {
				reg.save(function(err, regDb) {
					Registration.findByIdAndRemove(regid, function(err, regDel) {
						setTimeout(function() {
							Activity.findById(activity1Id, function(err, act2) {
								expect(act2.curParticipants - 1).to.equal(act1.curParticipants);
								done();
							});
						}, 10);
					});
				});
			});
		});
	});

	describe('when an existing reservation is changed', function() {
		it('all properties are correct', function(done) {
			var reg = createRegistration('Parent', 'Child', 6, activity1Id);
			reg.save(function(err, regDb) {
				regDb.firstNameChild = 'Another First Name';
				regDb.save(function(err, regDb2) {
					expect(util.compareModels(regDb, regDb2)).to.be.true;
					done();
				});
			});
		});

		it('related activityId.curParticipants is updated', function(done) {
			var reg = createRegistration('Parent', 'Child', 7, activity1Id);
			var regid = reg._id;
			Activity.findById(activity1Id, function(err, act1) {
				Activity.findById(activity2Id, function(err, act2) {
					reg.save(function(err, regDb1) {
						console.log("First save");
						setTimeout(function() {
							Activity.findById(activity1Id, function(err, act11) {
								Activity.findById(activity2Id, function(err, act22) {
									reg.activityId = activity2Id;
										regDb1.save(function(err, regDb2) {
											console.log("Second save");
											setTimeout(function() {
												Activity.findById(activity1Id, function(err, act111) {
													Activity.findById(activity2Id, function(err, act222) {
														expect(act1.curParticipants).to.equal(act11.curParticipants - 1);
														expect(act1.curParticipants).to.equal(act111.curParticipants);
														expect(act2.curParticipants).to.equal(act22.curParticipants);
														expect(act2.curParticipants).to.equal(act222.curParticipants - 1);
														done();
													});
												});
										}, 10);
									});
								});
							});
						}, 10);	
					});
				});
			});
		});
	});
});
