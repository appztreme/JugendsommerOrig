'use strict';
let expect = require('expect');
let RegistrationModel = require('./../../models/registration');

describe('Registration Model', () => {
    let reg = null;
    before(() => {
        reg = new RegistrationModel({
          firstNameChild: 'firstName',
          lastNameChild: 'lastName',
          firstNameParent: 'firstNameParent',
          lastNameParent: 'lastNameParent',
          emailParent: 'abcdefg',
          phoneNumberParent: '1234 / 5678',
          schoolChild: '2. Klasse',
          birthdayChild: new Date(2010,3,15),
          activityId: '111111111111111111111102',
          healthChild: '-',
          bandName: 'band name',
          instrument: 'bugle',
          instrumentYears: '3 years',
          registrationDate: new Date(2016,7,12),
          nameContact1: 'contact1',
          telContact1: 'telContact1',
          nameContact2: 'contact2',
          telContact2: 'telContact2',
          userId: '111111111111111111111102'
        });
    });
    it('should have a defined Schema', () => {
        expect(reg.schema).toExist();
    });
    it('should have a firstNameChild string', () => {
        expect(reg.firstNameChild).toExist();
        expect(reg.firstNameChild).toEqual('firstName');
    });
    it('should have a lastNameChild string', () => {
        expect(reg.lastNameChild).toExist();
        expect(reg.lastNameChild).toEqual('lastName');
    });
    it('should have firstNameParent string', () => {
        expect(reg.firstNameParent).toExist();
        expect(reg.firstNameParent).toEqual('firstNameParent');
    });
    it('should have a lastNameParent string', () => {
        expect(reg.lastNameParent).toExist();
        expect(reg.lastNameParent).toEqual('lastNameParent');
    });
    it('should have a emailParent string', () => {
        expect(reg.emailParent).toExist();
        expect(reg.emailParent).toEqual('abcdefg');
    });
    it('should have a phoneNumberParent string', () => {
        expect(reg.phoneNumberParent).toExist();
        expect(reg.phoneNumberParent).toEqual('1234 / 5678');
    });
    it('should have a birthdayChild date', () => {
        expect(reg.birthdayChild).toExist();
        expect(reg.birthdayChild).toEqual(new Date(2010,3,15));
    });
    it('should have schoolChild string', () => {
        expect(reg.schoolChild).toExist();
        expect(reg.schoolChild).toEqual('2. Klasse');
    });
    it('should have a healthChidl string', () => {
        expect(reg.healthChild).toExist();
        expect(reg.healthChild).toEqual('-');
    });
    it('should have a bandName string', () => {
        expect(reg.bandName).toExist();
        expect(reg.bandName).toEqual('band name');
    });
    it('should have an instrument string', () => {
        expect(reg.instrument).toExist();
        expect(reg.instrument).toEqual('bugle');
    });
    it('should have an instrumentYears string', () => {
        expect(reg.instrumentYears).toExist();
        expect(reg.instrumentYears).toEqual('3 years');
    });
    it('should have a nameContact1 string', () => {
        expect(reg.nameContact1).toExist();
        expect(reg.nameContact1).toEqual('contact1');
    });
    it('should have a telContact1 string', () => {
        expect(reg.telContact1).toExist();
        expect(reg.telContact1).toEqual('telContact1');
    });
    it('should have a nameContact2 string', () => {
        expect(reg.nameContact2).toExist();
        expect(reg.nameContact2).toEqual('contact2');
    });
    it('should have a telContact2 string', () => {
        expect(reg.telContact2).toExist();
        expect(reg.telContact2).toEqual('telContact2');
    });
    it('should have a isPaymentDone default bool = false', () => {
        expect(reg.isPaymentDone).toEqual(false);
    });
    it('should have a isEmailNotified default bool = false', () => {
        expect(reg.isEmailNotified).toEqual(false);
    });
    it('should have an activityId reference', () => {
        expect(reg.activityId).toExist();
        expect(reg.activityId.toString()).toEqual('111111111111111111111102');
    });
    it('should have an prevActivityId reference not set initially', () => {
        expect(reg.prevActivityId).toEqual(undefined);
    });
    it('should have a registrationDate string', () => {
        expect(reg.registrationDate).toExist();
        expect(new Date(reg.registrationDate)).toEqual(new Date(2016,7,12));
    });
    it('should have a user reference', () => {
        expect(reg.userId).toExist();
        expect(reg.userId.toString()).toEqual('111111111111111111111102');
    });
});
