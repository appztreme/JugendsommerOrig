'use strict';
var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
var requestSession = require('supertest-session');
let check = require('./helper/checkResponseStatus');
let loginHelper = require('./helper/loginAs');


describe('LENDING', function() {
  describe('GET /lendings/date', function() {
      describe('authorized request', function() {
          var testSession = requestSession(app);
          before('login', done => loginHelper.loginAs(testSession, 'fadmin', 'fadmin', done));
          it('should return 1 lendings', function(done) {
              testSession.get('/api/lendings/date')
                  .query({date: '2016-06-16'})
                  .end((err, res) => {
                      expect(err).toNotExist();
                      expect(res).toExist();
                      expect(res.status).toEqual(200);
                      expect(res.body).toBeA('array');
                      expect(res.body.length).toEqual(1);
                      done();
                  });
          });
      });
      describe('unauthorized request', function() {
          var testSession = requestSession(app);
          before('login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
          it('should be refused', function(done) {
              testSession.get('/api/lendings/date')
                  .query({date: '2016-06-16'})
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
              request(app).get('/api/lendings/date')
                  .query({date: '2016-06-16'})
                  .end((err, res) => {
                      expect(err).toNotExist();
                      expect(res).toExist();
                      expect(res.status).toEqual(403);
                      done();
                  });
          });
      });
  });
  describe('GET /lendings/dateAndUser', function() {
      describe('authorized request', function() {
          var testSession = requestSession(app);
          before('login', done => loginHelper.loginAs(testSession, 'fadmin', 'fadmin', done));
          it('should return 1 lendings', function(done) {
              testSession.get('/api/lendings/dateAndUser')
                  .query({date: '2016-06-16', userId: '111111111111111111110003'})
                  .end((err, res) => {
                      expect(err).toNotExist();
                      expect(res).toExist();
                      expect(res.status).toEqual(200);
                      expect(res.body).toBeA('array');
                      expect(res.body.length).toEqual(1);
                      done();
                  });
          });
      });
      describe('unauthorized request', function() {
          var testSession = requestSession(app);
          before('login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
          it('should be refused', function(done) {
              testSession.get('/api/lendings/dateAndUser')
                  .query({date: '2016-06-16', userId: '111111111111111111110003'})
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
              request(app).get('/api/lendings/dateAndUser')
                  .query({date: '2016-06-16', userId: '111111111111111111110003'})
                  .end((err, res) => {
                      expect(err).toNotExist();
                      expect(res).toExist();
                      expect(res.status).toEqual(403);
                      done();
                  });
          });
      });
  });
  describe('GET /lendings/user', function() {
      describe('authorized request', function() {
          var testSession = requestSession(app);
          before('login', done => loginHelper.loginAs(testSession, 'fadmin', 'fadmin', done));
          it('should return 1 lendings', function(done) {
              testSession.get('/api/lendings/user')
                  .query({userId: '111111111111111111110003'})
                  .end((err, res) => {
                      expect(err).toNotExist();
                      expect(res).toExist();
                      expect(res.status).toEqual(200);
                      expect(res.body).toBeA('array');
                      expect(res.body.length).toEqual(2);
                      done();
                  });
          });
      });
      describe('unauthorized request', function() {
          var testSession = requestSession(app);
          before('login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
          it('should be refused', function(done) {
              testSession.get('/api/lendings/user')
                  .query({userId: '111111111111111111110003'})
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
              request(app).get('/api/lendings/user')
                  .query({userId: '111111111111111111110003'})
                  .end((err, res) => {
                      expect(err).toNotExist();
                      expect(res).toExist();
                      expect(res.status).toEqual(403);
                      done();
                  });
          });
      });
  });
  describe('POST /lendings', () => {
    describe('free resource', () => {
      var testSession = requestSession(app);
      before('login', done => loginHelper.loginAs(testSession, 'fadmin', 'fadmin', done));
      it('should be reserved for user', done => {
        testSession.post('/api/lendings')
          .send({type: 'xyz',
                 userId: '111111111111111111110003',
                 eventId: '111111111111111111111112',
                 resourceId: '111111111111111111000003',
                 date: '2016-06-18'
               })
          .end((err, res) => {
              expect(err).toNotExist();
              expect(res).toExist();
              expect(res.status).toEqual(201);
              done();
          });
      });
    });
    describe('reserved resource', () => {
      var testSession = requestSession(app);
      before('login', done => loginHelper.loginAs(testSession, 'fadmin', 'fadmin', done));
      it('can not be reserved again', done => {
        testSession.post('/api/lendings')
          .send({type: 'xyz',
                 userId: '111111111111111111110003',
                 eventId: '111111111111111111111112',
                 resourceId: '111111111111111111000003',
                 date: '2016-06-17'
               })
          .end((err, res) => {
              expect(err).toNotExist();
              expect(res).toExist();
              expect(res.status).toEqual(409);
              expect(res.body.hasOwnProperty('message')).toBeTrue();
              expect(res.body.message).toEqual('Alle Materialien dieses Types sind schon gebucht.');
              done();
          });
      });
    });
    describe('unauthorized request', () => {
      var testSession = requestSession(app);
      before('login', done => loginHelper.loginAs(testSession, 'user', 'user', done));
      it('should be refused', done => {
        testSession.post('/api/lendings')
          .send({type: 'xxx',
                 userId: '111111111111111111110003',
                 eventId: '111111111111111111111112',
                 resourceId: '111111111111111111000001',
                 date: '2016-06-17'
               })
          .end((err, res) => {
              expect(err).toNotExist();
              expect(res).toExist();
              expect(res.status).toEqual(403);
              done();
          });
      });
    });
    describe('unauthenticated request', () => {
      it('should be refused', done => {
        request(app).post('/api/lendings')
          .send({type: 'xxx',
                 userId: '111111111111111111110003',
                 eventId: '111111111111111111111112',
                 resourceId: '111111111111111111000001',
                 date: '2016-06-17'
               })
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
