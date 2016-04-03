'use strict';
var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');
let check = require('./helper/checkResponseStatus');

function checkUserToBeEqual(res, user) {
    expect(res.body.hasOwnProperty('firstName')).toBe(true);
    expect(res.body.firstName).toEqual(user.firstName);
    expect(res.body.hasOwnProperty('lastName')).toBe(true);
    expect(res.body.lastName).toEqual(user.lastName);
    expect(res.body.hasOwnProperty('userEmail')).toBe(true);
    expect(res.body.userEmail).toEqual(user.userEmail);
    expect(res.body.hasOwnProperty('userTel')).toBe(true);
    expect(res.body.userTel).toEqual(user.userTel);
    expect(res.body.hasOwnProperty('userName')).toBe(true);
    expect(res.body.userName).toEqual(user.userName);
    expect(res.body.hasOwnProperty('roles')).toBe(true);
};

describe('User', function() {
    describe('GET /user/:id', () => {
        it('should return an object with correct key and value pairs', function(done) {
            var expectedUser = {
                firstName: 'adminFirst',
                lastName: 'adminLast',
                userTel: '+98 7654 321',
                userEmail: 'adminadmin',
                userName: 'admin',
                roles: ['admin']
            };
            request(app).get('/api/user/111111111111111111110002')
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 201);
                    checkUserToBeEqual(res, expectedUser);
                    expect(res.body.hasOwnProperty('salt')).toNotExist();
                    expect(res.body.hasOwnProperty('hashedPassword')).toNotExist();
                    done();
                });
        });
    });
    describe('POST /user', () => {
        it('should create new user in db', done => {
            var newUser = {
                firstName: 'postFirst',
                lastName: 'postLast',
                userEmail: 'xxxx',
                userTel: '123 / 987',
                userName: 'post',
                pwd: 'post'
            };
            request(app).post('/api/user')
                .send(newUser)
                .end((err, res) => {
                    check.checkResponseStatus(err, res, 201);
                    checkUserToBeEqual(res, newUser);
                    done();
                });
        });
    });
    describe('POST /user/requestUserToken', () => {
        it('should send security token via email', done => {
            request(app).post('/api/user/requestUserToken')
              .send({userName: 'user'})
              .end((err, res) => {
                check.checkResponseStatus(err, res, 202);
                done();
              })
        });
    });
    describe('POST /user/updatePwd', () => {
        it('should update password if security-token fits', done => {
            request(app).post('/api/user/updatePwd')
              .send({userName: 'test', userToken: '3dd4', password: 'test1'})
              .end((err, res) => {
                check.checkResponseStatus(err, res, 201);
                done();
              });
        });
        it('should send error in case of wrong security-token', done => {
          request(app).post('/api/user/updatePwd')
            .send({userName: 'test', userToken: 'abcd', password: 'test1'})
            .end((err, res) => {
              check.checkResponseStatus(err, res, 500);
              let isMismatchError = res.error.text.indexOf('Security Token Mismatch') > 1;
              expect(isMismatchError).toEqual(true);
              done();
            });
        });
    });
});
