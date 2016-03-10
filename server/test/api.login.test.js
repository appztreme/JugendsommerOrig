var expect = require('expect');
var request = require('supertest');
var app = require('./../../app');

const checkLogin = (err, res, username) => {
    expect(err).toNotExist;
    expect(res).toExist;
    expect(res.status).toEqual(200);
    expect(res.body).toBeA('object');
    expect(res.body.hasOwnProperty('success')).toBe(true);
    expect(res.body.success).toEqual(true);
    expect(res.body.hasOwnProperty('user')).toBe(true);
    expect(res.body.user).toBeA('object');
    expect(res.body.user.userName).toEqual(username);
    expect(res.body.user).toNotBe(null);
};

describe('Login', () => {
    describe('POST /login', () => {
        it('<user> should login successfully', function(done) {
            request(app).post('/api/login')
                .send({username: 'user', password: 'user'})
                .end((err, res) => {
                    checkLogin(err, res, 'user');
                    done();
                });
        });
        it('<admin> should login successfully', function(done) {
            request(app).post('/api/login')
                .send({username: 'admin', password: 'admin'})
                .end((err, res) => {
                    checkLogin(err, res, 'admin');
                    done();
                })
        });

        it('<fadmin> should login successfully', function(done) {
            request(app).post('/api/login')
                .send({username: 'fadmin', password: 'fadmin'})
                .end((err, res) => {
                    checkLogin(err, res, 'fadmin');
                    done();
                });
        });
    });
});
