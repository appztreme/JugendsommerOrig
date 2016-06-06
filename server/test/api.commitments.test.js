'use strict';
var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
var requestSession = require('supertest-session');
let check = require('./helper/checkResponseStatus');
let loginHelper = require('./helper/loginAs');

const curYear = new Date().getFullYear();
const today = new Date();

function checkCommitmentToBeEqual(res, com) {
    expect(res.body.hasOwnProperty('name')).toBe(true);
    expect(res.body.name).toEqual(com.name);
    expect(res.body.hasOwnProperty('index')).toBe(true);
    expect(res.body.index).toEqual(com.index);
    expect(res.body.hasOwnProperty('description')).toBe(true);
    expect(res.body.description).toEqual(com.description);
    expect(res.body.hasOwnProperty('date')).toBe(true);
    expect(new Date(res.body.date)).toEqual(com.date);
    expect(res.body.hasOwnProperty('type')).toBe(true);
    expect(res.body.type).toEqual(com.type);
    expect(res.body.hasOwnProperty('amount')).toBe(true);
    expect(res.body.amount).toEqual(com.amount);
    expect(res.body.hasOwnProperty('eventId')).toBe(true);
    expect(res.body.eventId).toEqual(com.eventId);
    expect(res.body.hasOwnProperty('userId')).toBe(true);
    expect(res.body.userId).toEqual(com.userId);
};

describe('Commitments', () => {
  describe('GET /commitments', () => {
    describe('authorized request', () => {
      let testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession, 'admin', 'admin', done));
      it('should return status 200', done => {
          testSession.get('/api/commitments')
              .end((err, res) => {
                  check.checkResponseStatus(err, res, 200);
                  done();
              });
      });
      it('should return collection of 4 entities', done => {
          testSession.get('/api/commitments')
              .end((err, res) => {
                  check.checkResponseStatus(err, res, 200);
                  expect(res.body).toBeA('array');
                  expect(res.body.length).toEqual(4);
                  done();
              });
      });
      it('should return collection of 2 entities with eventId param', done => {
          testSession.get('/api/commitments/byEvent/111111111111111111111111')
            .end((err, res) => {
                check.checkResponseStatus(err, res, 200);
                expect(res.body).toBeA('array');
                expect(res.body.length).toEqual(2);
                done();
            });
      });
    });
    describe('unauthorized request', () => {
      let testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
      it('should be refused', done => {
        testSession.get('/api/commitments')
            .end((err, res) => {
              check.checkResponseStatus(err, res, 403);
              done();
            });
      });
    });
    describe('unauthenticated request', () => {
      it('should be refused', done => {
        request(app).get('/api/commitments')
          .end((err, res) => {
            check.checkResponseStatus(err, res, 403);
            done();
          });
      });
    });
  });
  describe('GET /commitments/byUser/:userId', () => {
    describe('authorized request', () => {
      let testSession = requestSession(app);
      before('login', done => loginHelper.loginAs(testSession, 'fadmin', 'fadmin', done));
      it('should return collection of 4 entities with userId param', done => {
          testSession.get('/api/commitments/byUser/111111111111111111110003')
            .end((err, res) => {
                check.checkResponseStatus(err, res, 200);
                expect(res.body).toBeA('array');
                expect(res.body.length).toEqual(4);
                done();
            });
      })
    });
    describe('unauthorized request', () => {
      let testSession = requestSession(app);
      before('login', done => loginHelper.loginAs(testSession, 'admin', 'admin', done));
      it('should be refused', done => {
        request(app).get('/api/commitments/byUser/111111111111111111110003')
          .end((err, res) => {
            check.checkResponseStatus(err, res, 403);
            done();
          });
      });
    });
    describe('unauthenticated request', () => {
      it('should be refused', done => {
        request(app).get('/api/commitments/byUser/111111111111111111110003')
          .end((err, res) => {
            check.checkResponseStatus(err, res, 403);
            done();
          });
      });
    });
  });
  describe('GET /commitments/:commitmentId', () => {
    const expectedCommitment = {
      _id: '111111111111111111100002',
      name: 'commitment 2',
      index: 2,
      description: 'description commitment 2',
      date: new Date(curYear,11,1),
      amount: 12.4,
      type: 'food',
      eventId: '111111111111111111111111',
      userId: '111111111111111111110003',
      isPaymentDone: false,
      isPaymentJDDone: false,
      isInvoice: true
    };
    describe('authorized request', () => {
        const testSession = requestSession(app);
        before('Login', done => loginHelper.loginAs(testSession,'fadmin','fadmin',done));
        it('should return requested object', done => {
          testSession.get('/api/commitments/111111111111111111100002')
            .end((err, res) => {
              check.checkResponseStatus(err, res, 200);
              checkCommitmentToBeEqual(res, expectedCommitment);
              done();
            });
        });
    });
    describe('unauthorized request', () => {
      const testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession,'user','user',done));
      it('should be refused', done => {
        testSession.get('/api/commitments/111111111111111111100002')
          .end((err, res) => {
            check.checkResponseStatus(err, res, 403);
            done();
          });
      });
    });
    describe('unauthenticated request', () => {
      it('should be refused', done => {
        request(app).get('/api/commitments/111111111111111111100002')
          .end((err, res) => {
            check.checkResponseStatus(err, res, 403);
            done();
          });
      });
    });
  });
  describe('POST /commitments', () => {
    const newCommitment = {
      name: 'test name 1',
      description: 'test description 1',
      amount: 344.53,
      date: new Date(curYear,5,5),
      type: 'business',
      eventId: '111111111111111111111112',
      userId: '111111111111111111110003',
      isPaymentDone: false,
      isPaymentJDDone: true,
      isInvoice: false,
      isCleared: false,
    };
    describe('authorized request', () => {
      let testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession,'fadmin','fadmin',done));
      it('should create new commitment entity', done => {
        testSession.post('/api/commitments')
          .send(newCommitment)
          .end((err, res) => {
            check.checkResponseStatus(err, res, 201);
            newCommitment.index = 4; //to test auto creation of index value
            checkCommitmentToBeEqual(res,newCommitment);
            done();
          });
      });
    });
    describe('unauthorized request', () => {
      let testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
      it('should be refused', done => {
        testSession.post('/api/commitments')
            .send(newCommitment)
            .end((err, res) => {
                check.checkResponseStatus(err, res, 403);
                done();
            });
      });
    });
    describe('unauthenticated request', () => {
      it('should be refused', done => {
        request(app).post('/api/commitments')
            .send(newCommitment)
            .end((err, res) => {
                check.checkResponseStatus(err, res, 403);
                done();
            });
      });
    });
  });
  describe('PUT /commitments', () => {
      const changedCommitment = {
        _id: '111111111111111111100003',
        name: 'commitment 3 changed',
        index: 3,
        description: 'description commitment 3 changed',
        date: new Date(curYear,9,1),
        amount: 77.12,
        type: 'food',
        eventId: '111111111111111111111112',
        userId: '111111111111111111110003',
        isPaymentDone: true,
        isPaymentJDDone: false,
        isInvoice: false,
        isCleared: true,
      };
    describe('authorized request', () => {
      const testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession,'fadmin','fadmin',done));
      it('should update object in db', done => {
        testSession.put('/api/commitments')
          .send(changedCommitment)
          .end((err, res) => {
            check.checkResponseStatus(err, res, 201);
            checkCommitmentToBeEqual(res, changedCommitment);
            done();
          });
      });
    });
    describe('unauthorized request', () => {
      const testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession,'user','user',done));
      it('should be refused', done => {
        testSession.put('/api/commitments')
          .send(changedCommitment)
          .end((err, res) => {
            check.checkResponseStatus(err, res, 403);
            done();
          });
      });
    });
    describe('unauthenticated request', () => {
      it('should be refused', done => {
        request(app).put('/api/commitments')
          .send(changedCommitment)
          .end((err, res) => {
            check.checkResponseStatus(err, res, 403);
            done();
          });
      });
    });
  });
  describe('DELETE /commitments', () => {
    describe('authorized request', () => {
      const testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession,'admin','admin',done));
      it('should delete object from db', done => {
        testSession.delete('/api/commitments/111111111111111111100004')
          .end((err, res) => {
            check.checkResponseStatus(err, res, 200);
            done();
          });
      });
    });
    describe('unauthorized request', () => {
      const testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession,'user','user',done));
      it('should be refused', done => {
        testSession.delete('/api/commitments/111111111111111111100004')
          .end((err, res) => {
            check.checkResponseStatus(err, res, 403);
            done();
          });
      });
    });
    describe('unauthenticated request', () => {
      it('should be refused', done => {
      request(app).delete('/api/commitments/111111111111111111100004')
        .end((err, res) => {
          check.checkResponseStatus(err, res, 403);
          done();
        });
      });
    });
  });
});
