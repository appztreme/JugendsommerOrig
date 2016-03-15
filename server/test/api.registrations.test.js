var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
var requestSession = require('supertest-session');

var curYear = new Date().getFullYear();

function checkRegistrationToBeEqual(res, reg) {
    expect(res.body.hasOwnProperty('firstNameParent')).toBe(true);
    expect(res.body.firstNameParent).toEqual(reg.firstNameParent);
    expect(res.body.hasOwnProperty('lastNameParent')).toBe(true);
    expect(res.body.lastNameParent).toEqual(reg.lastNameParent);
    expect(res.body.hasOwnProperty('phoneNumberParent')).toBe(true);
    expect(res.body.phoneNumberParent).toEqual(reg.phoneNumberParent);
    expect(res.body.hasOwnProperty('emailParent')).toBe(true);
    expect(res.body.emailParent).toEqual(reg.emailParent);
    expect(res.body.hasOwnProperty('firstNameChild')).toBe(true);
    expect(res.body.firstNameChild).toEqual(reg.firstNameChild);
    expect(res.body.hasOwnProperty('lastNameChild')).toBe(true);
    expect(res.body.lastNameChild).toEqual(reg.lastNameChild);
    expect(res.body.hasOwnProperty('birthdayChild')).toBe(true);
    expect(new Date(res.body.birthdayChild)).toEqual(reg.birthdayChild);
    expect(res.body.hasOwnProperty('schoolChild')).toBe(true);
    expect(res.body.schoolChild).toEqual(reg.schoolChild);
    expect(res.body.hasOwnProperty('healthChild')).toBe(true);
    expect(res.body.healthChild).toEqual(reg.healthChild);
    expect(res.body.hasOwnProperty('nameContact1')).toBe(true);
    expect(res.body.nameContact1).toEqual(reg.nameContact1);
    expect(res.body.hasOwnProperty('telContact1')).toBe(true);
    expect(res.body.telContact1).toEqual(reg.telContact1);
    expect(res.body.hasOwnProperty('nameContact2')).toBe(true);
    expect(res.body.nameContact2).toEqual(reg.nameContact2);
    expect(res.body.hasOwnProperty('telContact2')).toBe(true);
    expect(res.body.telContact2).toEqual(reg.telContact2);
    expect(res.body.hasOwnProperty('activityId'));
    expect(res.body.activityId).toEqual(reg.activityId);
    expect(res.body.hasOwnProperty('prevActivityId')).toBe(true);
    expect(res.body.prevActivityId).toEqual(reg.prevActivityId);
    expect(res.body.hasOwnProperty('registrationDate')).toBe(true);
    expect(new Date(res.body.registrationDate)).toEqual(reg.registrationDate);
    expect(res.body.hasOwnProperty('isPaymentDone')).toBe(true);
    expect(res.body.isPaymentDone).toEqual(reg.isPaymentDone);
    expect(res.body.hasOwnProperty('isEmailNotified')).toBe(true);
    expect(res.body.isEmailNotified).toEqual(reg.isEmailNotified);
};

describe('Registrations', function() {
    describe('GET /registrations', function() {
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
          it('should return status 200', function(done) {
              testSession.get('/api/registrations')
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
    });
    describe('GET /registrations/:registrationId', function() {
      var expectedReservation = {
          firstNameChild: 'firstName',
          lastNameChild: 'lastName',
          firstNameParent: 'firstNameParent',
          lastNameParent: 'lastNameParent',
          emailParent: 'adfghi',
          schoolChild: '1. Klasse',
          activityId: '111111111111111111111102',
          healthChild: 'alles gut',
          registrationDate: new Date(curYear, 5,5)
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
        it('should be an object with correct key and value pairs', function() {
            testSession.get('/registrations/111111111111111111111001')
              .end((err, res) => {
                  expect(err).toNotExist();
                  expect(res).toExist();
                  expect(res.status).toEqual(200);
                  checkRegistrationToBeEqual(res, expectedReservation);
                  done();
              });
        });
      });
      describe('unauthorized request', function() {
        var testSession = requestSession(app);
        before('login', function(done) {
            testSession.post('/api/login')
                .send({username: 'admin', password: 'admin'})
                .end((err, res) => {
                    expect(res.status).toEqual(200);
                    done();
                });
        });
      });
      describe('unauthenticated request', function() {

      });
    });
    describe('PUT /registrations', function() {
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
      });
      describe('unauthorized request', function() {
        var testSession = requestSession(app);
        before('login', function(done) {
            testSession.post('/api/login')
                .send({username: 'admin', password: 'admin'})
                .end((err, res) => {
                    expect(res.status).toEqual(200);
                    done();
                });
        });
      });
      describe('unauthenticated request', function() {

      });
    });
    describe('POST /registrations', function () {

    });
    describe('DELETE /registrations', function() {
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
            testSession.delete('/api/registrations/111111111111111111111001')
              .end((err, res) => {
                  expect(res.status).toEqual(403);
                  done();
              });
        });
      });
      describe('unauthenticated request', function() {
          it('should be refused', function(done) {
            request(app).delete('/api/registrations/111111111111111111111001')
              .end((err, res) => {
                  expect(res.status).toEqual(403);
                  done();
              });

          });
      });
    });
});
