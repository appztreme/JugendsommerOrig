var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
var requestSession = require('supertest-session');

var curYear = new Date().getFullYear();

function checkActivityToBeEqual(res, activity) {
    expect(res.body.hasOwnProperty('name')).toBe(true);
    expect(res.body.name).toEqual(activity.name);
    expect(res.body.hasOwnProperty('description')).toBe(true);
    expect(res.body.description).toEqual(activity.description);
    expect(res.body.hasOwnProperty('startDate')).toBe(true);
    expect(new Date(res.body.startDate)).toEqual(activity.startDate);
    expect(res.body.hasOwnProperty('endDate')).toBe(true);
    expect(new Date(res.body.endDate)).toEqual(activity.endDate);
    expect(res.body.hasOwnProperty('maxParticipants')).toBe(true);
    expect(res.body.maxParticipants).toEqual(activity.maxParticipants);
    expect(res.body.hasOwnProperty('queueSize')).toBe(true);
    expect(res.body.queueSize).toEqual(activity.queueSize);
    expect(res.body.hasOwnProperty('curParticipants')).toBe(true);
};

describe('Activity', function() {
    describe('GET /activities for given eventId', function() {
        it('should return 200 response', function(done) {
            request(app).get('/api/activities')
                .query({eventId: '111111111111111111111111'})
                .end((err, res) => {
                    expect(err).toNotExist();
                    expect(res).toExist();
                    expect(res.status).toEqual(200);
                    done();
                });
        });
        it('should return collection of 2 entities', function(done) {
            request(app).get('/api/activities')
                .query({eventId: '111111111111111111111111'})
                .end((err, res) => {
                    expect(res.body).toExist();
                    expect(res.body).toBeA('array');
                    expect(res.body.length).toEqual(2);
                    done();
                });
        });
    });
    describe('GET /activities with given activityId', function() {
        it('should return 200 response', function(done) {
            request(app).get('/api/activities')
                .query({activityId: '111111111111111111111108'})
                .end((err, res) => {
                    expect(err).toNotExist();
                    expect(res.body).toExist();
                    expect(res.status).toEqual(200);
                    done();
                });
        });
        it.skip('should return collection of 3 entities', function(done) {
            request(app).get('/api/activities')
                .query({activityId: '111111111111111111111108'})
                .end((err, res) => {
                    expect(res.body).toExist();
                    expect(res.body).toBeA('array');
                    expect(res.body.length).toEqual(3);
                    done();
                });
        });
    });
    describe('GET /activities/:id', function() {
        it('should return an object with correct key and value pairs', function(done) {
            var expectedActivity = {
                name: 'activity2',
                description: 'description activity2',
                startDate: new Date(curYear,11,4),
                endDate: new Date(curYear,11,7),
                maxParticipants: 3,
                queueSize: 1
            };
            request(app).get('/api/activities/111111111111111111111102')
                .end((err, res) => {
                    expect(err).toNotExist();
                    expect(res).toExist();
                    expect(res.status).toEqual(200);
                    checkActivityToBeEqual(res, expectedActivity);
                    done();
                });
        });
    });
    describe('POST /activities/', function() {
        var newActivity = {
            name: 'activity post',
            description: 'description activity post',
            startDate: new Date(curYear,4,5),
            endDate: new Date(curYear,4,20),
            eventId: '111111111111111111111112',
            maxParticipants: 4,
            queueSize: 2
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
                testSession.post('/api/activities')
                    .send(newActivity)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(201);
                        checkActivityToBeEqual(res, newActivity);
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
                testSession.post('/api/activities')
                    .send(newActivity)
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
                request(app).post('/api/activities')
                    .send(newActivity)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(403);
                        done();
                    });
            });
        });
    });
    describe('PUT /activities/', function() {
        var changedActivity = {
            _id: '111111111111111111111109',
            name: 'changed activity5',
            description: 'description changed activity5',
            startDate: new Date(curYear,10,10),
            endDate: new Date(curYear,10,12),
            maxParticipants: 6,
            queueSize: 3
        };
        describe('authorized request', function() {
            var testSession = requestSession(app);
            before('login', function(done) {
                testSession.post('/api/login')
                    .send({username: 'admin', password: 'admin'})
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(200);
                        done();
                    });
            });
            it('should update existing entry', function(done) {
                testSession.put('/api/activities')
                    .send(changedActivity)
                    .end((err, res) => {
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(201);
                        checkActivityToBeEqual(res, changedActivity);
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
                        expect(err).toNotExist();
                        expect(res).toExist();
                        expect(res.status).toEqual(200);
                        done();
                    });
            });
            it('should be refused', function(done) {
                testSession.put('/api/activities')
                    .send(changedActivity)
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
                request(app).put('/api/activities')
                    .send(changedActivity)
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
