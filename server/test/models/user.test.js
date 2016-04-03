'use strict';
let expect = require('expect');
let UserModel = require('./../../models/user');

describe('User Model', () => {
    let user = null;
    before(() => {
        user = new UserModel({
            firstName: 'firstName',
            lastName: 'lastName',
            userEmail: 'xxx',
            userTel: '123 456',
            userName: 'userName',
            roles: ['admin']
        });
    });
    it('should have a defined Schema', () => {
        expect(UserModel.schema).toExist();
    });
    it('should have a firstName string', () => {
        expect(user.firstName).toExist();
        expect(user.firstName).toEqual('firstName');
    });
    it('should have a lastName string', () => {
        expect(user.lastName).toExist();
        expect(user.lastName).toEqual('lastName');
    });
    it('should have a userTel string', () => {
        expect(user.userTel).toExist();
        expect(user.userTel).toEqual('123 456');
    });
    it('should have a userEmail string', () => {
        expect(user.userEmail).toExist();
        expect(user.userEmail).toEqual('xxx');
    });
    it('should have a userName string', () => {
        expect(user.userName).toExist();
        expect(user.userName).toEqual('userName');
    });
    it('should have a roles array of strings', () => {
        expect(user.roles).toExist();
        expect(user.roles).toBeA('array');
        expect(user.roles.indexOf('admin') >= 0).toBe(true);
    });
    it('should create a hashedPassword and salt', () => {
        expect(user.salt).toNotExist();
        expect(user.hashedPassword).toNotExist();
        const hpwd = user.hashPassword('test');
        expect(user.salt).toExist();
        expect(user.hashedPassword).toExist();
    });
    it('can be authenticated with password', () => {
        expect(user.authenticate('test')).toBe(true);
    });
    it('generates 4chars user token from the end of hashedPassword if hash < 25', () => {
        user.hashedPassword = '12ab34cd56ef78gh910';
        expect(user.getUserToken()).toEqual('h910');
    });
    it('generates 4chars user token from given pattern of hashedPassword if has >= 25', () => {
       user.hashedPassword = '7422a98bd783f63a9e242adde9d20fff5d20ad7d';
       expect(user.getUserToken()).toEqual('7b6d');
    });
});
