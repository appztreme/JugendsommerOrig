var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
var requestSession = require('supertest-session');

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
                      console.log(res.body);
                      //checkActivityToBeEqual(res, newActivity);
                      done();
                  });
          });
      });
    });
});
