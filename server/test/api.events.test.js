'use strict';
var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
var requestSession = require('supertest-session');
let check = require('./helper/checkResponseStatus');
let loginHelper = require('./helper/loginAs');

var curYear = new Date().getFullYear();

function checkEventToBeEqual(res, ev) {
    expect(res.body.hasOwnProperty('name')).toBe(true);
    expect(res.body.name).toEqual(ev.name);
    expect(res.body.hasOwnProperty('description')).toBe(true);
    expect(res.body.description).toEqual(ev.description);
    expect(res.body.hasOwnProperty('type')).toBe(true);
    expect(res.body.type).toEqual(ev.type);
    expect(res.body.hasOwnProperty('location')).toBe(true);
    expect(res.body.location).toEqual(ev.location);
    expect(res.body.hasOwnProperty('startDate')).toBe(true);
    expect(new Date(res.body.startDate)).toEqual(ev.startDate);
    expect(res.body.hasOwnProperty('endDate')).toBe(true);
    expect(new Date(res.body.endDate)).toEqual(ev.endDate);
    expect(res.body.hasOwnProperty('visibleFrom')).toBe(true);
    expect(new Date(res.body.visibleFrom)).toEqual(ev.visibleFrom);
    expect(res.body.hasOwnProperty('visibleTo')).toBe(true);
    expect(new Date(res.body.visibleTo)).toEqual(ev.visibleTo);
    expect(res.body.hasOwnProperty('budgetBusiness')).toBe(true);
    expect(res.body.budgetBusiness).toEqual(ev.budgetBusiness);
    expect(res.body.hasOwnProperty('budgetFood')).toBe(true);
    expect(res.body.budgetFood).toEqual(ev.budgetFood);
    expect(res.body.hasOwnProperty('info')).toBe(true);
    expect(res.body.info).toEqual(ev.info);
    expect(res.body.hasOwnProperty('isInternal')).toBe(true);
    expect(res.body.isInternal).toEqual(ev.isInternal);
};

describe('Event', function() {
    describe('GET /events', () => {
        it('should return 200 response', function(done) {
            request(app).get('/api/events')
                .end((err, res) => {
                    expect(err).toNotExist();
                    expect(res).toExist();
                    expect(res.status).toEqual(200);
                    done();
                });
        });
        it('should return collection of 2 entities', function(done) {
            request(app).get('/api/events')
                .end((err, res) => {
                    expect(res.body).toExist;
                    expect(res.body).toBeA('array');
                    expect(res.body.length).toEqual(2);
                    done();
                });
        });
    });
    describe('GET /events/asAdmin', () => {
      describe('authorized request', () => {
        let testSession = requestSession(app);
        before('Login', done => loginHelper.loginAs(testSession, 'admin', 'admin', done));
        it('should return 200 response and collection of 3 entities', function(done) {
            testSession.get('/api/events/asAdmin')
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 200);
                    expect(res.body).toExist;
                    expect(res.body).toBeA('array');
                    expect(res.body.length).toEqual(3);
                    done();
                });
        });
      });
      describe('unauthorized request', () => {
        let testSession = requestSession(app);
        before('Login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
        it('should be refused', function(done) {
            testSession.get('/api/events/asAdmin')
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 403);
                    done();
                });
        });
      });
      describe('unauthenticated request', () => {
          it('should be refused', done => {
            request(app)
              .get('/api/events/asAdmin')
              .end((err, res) => {
                check.checkResponseStatus(err, res, 403);
                done();
              });
          });
      });
    });
    describe('GET /events/:id', function() {
        it('should be an object with correct key and value pairs', function(done) {
            var expectedEvent = {
                name: 'event1',
                description: 'description event1',
                type: 'summer',
                location: 'Jenesien',
                startDate: new Date(curYear,11,1),
                endDate: new Date(curYear,12,1),
                visibleFrom: new Date(curYear,4,1),
                visibleTo: new Date(curYear,10,1),
                budgetBusiness: 3500,
                budgetFood: 200,
                info: 'info for event1',
                isInternal: false,
            };
            request(app).get('/api/events/111111111111111111111111')
                .end((err, res) => {
                    expect(err).toNotExist();
                    expect(res).toExist();
                    expect(res.status).toEqual(200);
                    checkEventToBeEqual(res, expectedEvent);
                    done();
                });
        });
    });
    describe('POST /events/', function() {
        var newEvent = {
            name:'eventPost',
            description:'description eventPost',
            type: 'music',
            location: 'Jenesien',
            startDate: new Date(curYear,4,3),
            endDate: new Date(curYear,7,15),
            visibleFrom: new Date(curYear,1,1),
            visibleTo: new Date(curYear,11,1),
            budgetBusiness: 501,
            budgetFood: 26,
            info: 'info for eventPost',
            isInternal: true,
        };
        describe('authorized request', function() {
            var testSession = requestSession(app);
            before('login', function(done) {
                testSession.post('/api/login')
                    .send({username: 'admin', password: 'admin'})
                    .end((err, res) => {
                        expect(res.status).toEqual(200);
                        done();
                    });
            });
            it('should insert new entry in db', function(done) {

                testSession.post('/api/events')
                    .send(newEvent)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(201);
                        checkEventToBeEqual(res, newEvent);
                        done();
                    });
            });
        });
        describe('unauthorized request', function() {
            var testSession = requestSession(app);
            before('login', function(done) {
                testSession.post('/api/login')
                    .send({username: 'user', password: 'user'})
                    .end((err, res) => {
                        expect(res.status).toEqual(200);
                        done();
                    });
            });
            it('should be refused', function(done) {

                testSession.post('/api/events')
                    .send(newEvent)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(403);
                        done();
                    });
            });
        });
        describe('unauthenticated request', function() {
            it('should be refused', function(done) {
                request(app).post('/api/events')
                    .send(newEvent)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(403);
                        done();
                    });
            });
        });
    });
    describe('PUT /events/', function() {
        var changedEvent = {
            _id: '111111111111111111111119',
            name:'changed event',
            description:'description changed event',
            type: 'summer',
            location: 'Karneid',
            startDate: new Date(curYear,5,12),
            endDate: new Date(curYear,9,21),
            visibleFrom: new Date(curYear,2,11),
            visibleTo: new Date(curYear,12,3),
            budgetBusiness: 750,
            budgetFood: 890,
            info: 'info for changed event',
            isInternal: false,
        };
        describe('authorized request', function() {
            var testSession = requestSession(app);
            before('login', done => {
                testSession.post('/api/login')
                    .send({username: 'admin', password: 'admin'})
                    .end((err, res) => {
                        expect(res.status).toEqual(200);
                        done();
                    });
                });
            it('should update existing entry', function(done) {
                testSession.put('/api/events')
                    .send(changedEvent)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(201);
                        checkEventToBeEqual(res, changedEvent);
                        done();
                    });
            });
        });
        describe('unauthorized request', function() {
            var testSession = requestSession(app);
            before('login', function(done) {
                testSession.post('/api/login')
                    .send({username: 'user', password: 'user'})
                    .end((err, res) => {
                        expect(res.status).toEqual(200);
                        done();
                    });
                });
            it('should be refused', function(done) {
                testSession.put('/api/events')
                    .send(changedEvent)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(403);
                        done();
                    });
            });
        });
        describe('unauthenticated request', function() {
            it('should be refused', function(done) {
                request(app).put('/api/events')
                    .send(changedEvent)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(403);
                        done();
                    });
            });
        });
    });
});
