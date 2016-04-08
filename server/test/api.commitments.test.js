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
    expect(res.body.hasOwnProperty('description')).toBe(true);
    expect(res.body.description).toEqual(com.description);
    expect(res.body.hasOwnProperty('date')).toBe(true);
    expect(new Date(res.body.date)).toEqual(com.date);
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
      it('should return collection of 3 entities', done => {
          testSession.get('/api/commitments')
              .end((err, res) => {
                  check.checkResponseStatus(err, res, 200);
                  expect(res.body).toBeA('array');
                  expect(res.body.length).toEqual(3);
                  done();
              });
      });
      it('should return collection of 2 entities with eventId param', done => {
          testSession.get('/api/commitments?eventId=111111111111111111111111')
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
  describe('GET /commitments/:commitmentId', () => {

  });
  describe('POST /commitments', () => {
    const newCommitment = {
      name: 'test name 1',
      description: 'test description 1',
      amount: 344.53,
      date: new Date(curYear,5,5),
      eventId: '111111111111111111111112',
      userId: '111111111111111111110003'
    };
    describe('authorized request', () => {
      let testSession = requestSession(app);
      before('Login', done => loginHelper.loginAs(testSession,'fadmin','fadmin',done));
      it('should create new commitment entity', done => {
        testSession.post('/api/commitments')
          .send(newCommitment)
          .end((err, res) => {
            check.checkResponseStatus(err, res, 201);
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

  });
  describe('DELETE /commitments', () => {

  });
});
