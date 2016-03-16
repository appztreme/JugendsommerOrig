'use strict';

let check = require('./checkResponseStatus');

/**
 * send authentication request to supertest-session
 * with given user and password
 **/
module.exports.loginAs = (session, username, pwd, done) => {
    session.post('/api/login')
      .send({username: username, password: pwd})
      .end((err, res) => {
          check.checkResponseStatus(err, res, 200);
          done();
      });
};
