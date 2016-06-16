'use strict';
var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
var requestSession = require('supertest-session');
let check = require('./helper/checkResponseStatus');
let loginHelper = require('./helper/loginAs');


describe('RESOURCE', function() {
  describe('GET /resources/types', function() {
      describe('authorized request', function() {
          var testSession = requestSession(app);
          before('login', done => loginHelper.loginAs(testSession, 'fadmin', 'fadmin', done));
          it('should return 2 types', function(done) {

              testSession.get('/api/resources/types')
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

              testSession.get('/api/resources/types')
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
              request(app).get('/api/resources/types')
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
