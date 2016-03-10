var expect = require('expect');
var UserModel = require('./../../models/user');

describe('User Model', function() {
    var user = null;
    before(function() {
        user = new UserModel({
            firstName: 'firstName',
            lastName: 'lastName',
            userEmail: 'xxx',
            userTel: '123 456',
            userName: 'userName',
            roles: ['admin']
        });
    });
    it('should have a defined Schema', function() {
        expect(UserModel.schema).toExist();
    });
    it('should have a firstName string', function() {
        expect(user.firstName).toExist();
        expect(user.firstName).toEqual('firstName');
    });
    it('should have a lastName string', function() {
        expect(user.lastName).toExist();
        expect(user.lastName).toEqual('lastName');
    });
    it('should have a userTel string', function() {
        expect(user.userTel).toExist();
        expect(user.userTel).toEqual('123 456');
    });
    it('should have a userEmail string', function() {
        expect(user.userEmail).toExist();
        expect(user.userEmail).toEqual('xxx');
    });
    it('should have a userName string', function() {
        expect(user.userName).toExist();
        expect(user.userName).toEqual('userName');
    });
    it('should have a roles array of strings', function() {
        expect(user.roles).toExist();
        expect(user.roles).toBeA('array');
        expect(user.roles.indexOf('admin') >= 0).toBe(true);
    });
    it('should create a hashedPassword and salt', function() {
        expect(user.salt).toNotExist();
        expect(user.hashedPassword).toNotExist();
        const hpwd = user.hashPassword('test');
        expect(user.salt).toExist();
        expect(user.hashedPassword).toExist();
    });
    it('can be authenticated with password', function() {
        expect(user.authenticate('test')).toBe(true);
    });
});
