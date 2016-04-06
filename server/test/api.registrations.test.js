'use strict';
var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
var requestSession = require('supertest-session');
let check = require('./helper/checkResponseStatus');
let loginHelper = require('./helper/loginAs');

const curYear = new Date().getFullYear();
const today = new Date();

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
    //expect(res.body.hasOwnProperty('nameContact1')).toBe(true);
    // expect(res.body.nameContact1).toEqual(reg.nameContact1);
    // expect(res.body.hasOwnProperty('telContact1')).toBe(true);
    // expect(res.body.telContact1).toEqual(reg.telContact1);
    // expect(res.body.hasOwnProperty('nameContact2')).toBe(true);
    // expect(res.body.nameContact2).toEqual(reg.nameContact2);
    // expect(res.body.hasOwnProperty('telContact2')).toBe(true);
    // expect(res.body.telContact2).toEqual(reg.telContact2);
    expect(res.body.hasOwnProperty('activityId'));
    expect(res.body.activityId).toEqual(reg.activityId);
    // //expect(res.body.hasOwnProperty('prevActivityId')).toBe(true);
    // expect(res.body.prevActivityId).toEqual(reg.prevActivityId);
    const registrationDate = new Date(res.body.registrationDate);
    const givenYear = reg.registrationDate ? reg.registrationDate.getFullYear() : curYear;
    const givenMonth = reg.registrationDate ? reg.registrationDate.getMonth() : today.getMonth();
    const givenDay = reg.registrationDate ? reg.registrationDate.getDay() : today.getDay();
    expect(res.body.hasOwnProperty('registrationDate')).toBe(true);
    expect(registrationDate.getFullYear()).toEqual(givenYear);
    expect(registrationDate.getMonth()).toEqual(givenMonth);
    expect(registrationDate.getDay()).toEqual(givenDay);
    expect(res.body.hasOwnProperty('isPaymentDone')).toBe(true);
    expect(res.body.isPaymentDone).toEqual(reg.isPaymentDone);
    expect(res.body.hasOwnProperty('isEmailNotified')).toBe(true);
    expect(res.body.isEmailNotified).toEqual(reg.isEmailNotified);
    expect(res.body.hasOwnProperty('userId')).toBe(true);
    expect(res.body.userId).toEqual(reg.userId);
};

function checkActivityHasChanged(activityId, expectedNumber, done) {
    request(app).get('/api/activities/' + activityId)
        .end((err, res) => {
          check.checkResponseStatus(err, res, 200);
          expect(res.body.curParticipants).toEqual(expectedNumber);
          done();
        });
}

describe('Registrations', () => {
    describe('GET /registrations', () => {
      describe('authorized request', () => {
          let testSession = requestSession(app);
          before('login', done => loginHelper.loginAs(testSession, 'admin', 'admin', done));
          it('should return status 200', done => {
              testSession.get('/api/registrations')
                  .end((err, res) => {
                      check.checkResponseStatus(err, res, 200);
                      done();
                  });
          });
          it('should return collection of 3 entities', done => {
              testSession.get('/api/registrations')
                  .end((err, res) => {
                      check.checkResponseStatus(err, res, 200);
                      expect(res.body).toBeA('array');
                      expect(res.body.length).toEqual(3);
                      done();
                  });
          });
          it('should return collection of 2 entities with eventId param', done => {
              testSession.get('/api/registrations?eventId=111111111111111111111111')
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 200);
                    expect(res.body).toBeA('array');
                    expect(res.body.length).toEqual(2);
                    done();
                });
          });
          it('should return collection of 3 entities with activityId param', done => {
              testSession.get('/api/registrations?activityId=111111111111111111111102')
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 200);
                    expect(res.body).toBeA('array');
                    expect(res.body.length).toEqual(2);
                    done();
                });
          });
      });
    });
    describe('GET /registrations/:registrationId', done => {
      const expectedReservation = {
          firstNameChild: 'firstName',
          lastNameChild: 'lastName',
          firstNameParent: 'firstNameParent',
          lastNameParent: 'lastNameParent',
          emailParent: 'adfghi',
          phoneNumberParent: '1234 / 5678',
          schoolChild: '1. Klasse',
          birthdayChild: new Date(2010,11,9),
          activityId: '111111111111111111111102',
          healthChild: 'alles gut',
          registrationDate: new Date(curYear, 5,5),
          isPaymentDone: false,
          isEmailNotified: false,
          userId: '111111111111111111110001'
      };
      describe('authorized request', () => {
        let testSession = requestSession(app);
        before('login', done => loginHelper.loginAs(testSession, 'admin', 'admin', done));
        it('should be an object with correct key and value pairs', done => {
            testSession.get('/api/registrations/111111111111111111111001')
              .end((err, res) => {
                  check.checkResponseStatus(err, res, 200);
                  checkRegistrationToBeEqual(res, expectedReservation);
                  done();
              });
        });
      });
      describe('unauthorized request', () => {
        let testSession = requestSession(app);
        before('login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
        it('should be refused', done => {
            testSession.get('/api/registrations/111111111111111111111001')
              .end((err, res) => {
                  check.checkResponseStatus(err, res, 403);
                  done();
              });
        });
      });
    describe('unauthenticated request', () => {
          it('should be refused', done => {
              request(app).get('/api/registrations/111111111111111111111001')
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 403);
                    done();
                });
          });
      });
    });
    describe('PUT /registrations', () => {
      const registration = {
        _id: '111111111111111111111003',
        firstNameChild: 'firstName3',
        lastNameChild: 'lastName3',
        firstNameParent: 'firstNameParent3',
        lastNameParent: 'lastNameParent3',
        emailParent: 'abcgmx.at',
        phoneNumberParent: '9876 / 54321',
        schoolChild: '-',
        birthdayChild: new Date(2009,7,8),
        activityId: '111111111111111111111101',
        healthChild: '-',
        bandName: 'music band',
        instrument: 'french horn',
        instrumentYears: '4 Jahre',
        registrationDate: new Date(curYear, 6,19),
        isPaymentDone: true,
        isEmailNotified: false,
        userId:'111111111111111111110001'
      };
      describe('authorized request', () => {
        let testSession = requestSession(app);
        before('login', done => loginHelper.loginAs(testSession, 'admin', 'admin', done));
        it('should update fields', done => {
          testSession.put('/api/registrations')
            .send(registration)
            .end((err, res) => {
              check.checkResponseStatus(err, res, 201);
              checkRegistrationToBeEqual(res, registration);
              expect(res.body.hasOwnProperty('prevActivityId')).toBe(true);
              checkActivityHasChanged(res.body.prevActivityId, 0, done);
            });
        });
      });
      describe('unauthorized request', () => {
        let testSession = requestSession(app);
        before('login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
        it('should be refused', done => {
          testSession.put('/api/registrations')
            .send(registration)
            .end((err, res) => {
                check.checkResponseStatus(err, res, 403);
                done();
            });
        })
      });
      describe('unauthenticated request', () => {
        it('should be refused', done => {
          request(app).put('/api/registrations')
            .send(registration)
            .end((err, res) => {
                check.checkResponseStatus(err, res, 403);
                done();
            });
        });
      });
    });
    describe('POST /registrations', () => {
        const newRegistration = {
            firstNameChild: 'testFirstNameChild',
            lastNameChild: 'testLastNameChild',
            firstNameParent: 'testFirstNameParent',
            lastNameParent: 'testLastNameParent',
            phoneNumberParent: '231 / 432987',
            emailParent: 'testMailParent',
            schoolChild: '1. Klasse',
            bandName: 'band name',
            instrument: 'flute',
            instrumentYears: 'several',
            birthdayChild: new Date(2007,8,22),
            activityId: '111111111111111111111107',
            healthChild: 'Allergie',
            isPaymentDone: false,
            isEmailNotified: false,
            userId: '111111111111111111110001'
        };
        describe('authorized request', () => {
          let testSession = requestSession(app);
          before('Login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
          it('should create new Registration entity on db', done => {
              testSession.post('/api/registrations')
                .send(newRegistration)
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 201);
                    checkRegistrationToBeEqual(res, newRegistration);
                    checkActivityHasChanged(res.body.activityId, 1, done);
                });
          });
        });
        describe('unauthenticated request', () => {
          it('should be refused', done => {
              request(app).post('/api/registrations')
                .send(newRegistration)
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 403);
                    done();
                });
          });
        });
    });
    describe('DELETE /registrations', () => {
      describe('authorized request', () => {
        let testSession = requestSession(app);
        before('login', done => loginHelper.loginAs(testSession, 'admin', 'admin', done));
        it('should delete entity', done => {
            testSession.delete('/api/registrations/111111111111111111111002')
              .end((err, res) => {
                  check.checkResponseStatus(err, res, 200);
                  checkActivityHasChanged(res.body.activityId, 1, done);
              });
        });
      });
      describe('unauthorized request', () => {
        let testSession = requestSession(app);
        before('login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
        it('should be refused', done => {
            testSession.delete('/api/registrations/111111111111111111111002')
              .end((err, res) => {
                  check.checkResponseStatus(err, res, 403);
                  done();
              });
        });
      });
      describe('unauthenticated request', () => {
          it('should be refused', done => {
            request(app).delete('/api/registrations/111111111111111111111002')
              .end((err, res) => {
                  check.checkResponseStatus(err, res, 403);
                  done();
              });
          });
      });
    });
});
