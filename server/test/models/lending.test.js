'use strict'
let expect = require('expect');
let LendingModel = require('./../../models/lending');

describe('Lending Model', () => {
    var lend = null;
    before(() => {
        lend = new LendingModel({
            userId: '111111111111111111110003',
            eventId: '111111111111111111111111',
            resourceId: '111111111111111111000003',
            date: new Date("2016-06-02")
        });
    });
    it('should have a defined Schema', () => {
        expect(LendingModel.schema).toExist();
    });
    it('should have a date Date', () => {
        expect(lend.date).toExist();
        expect(lend.date).toEqual(new Date("2016-06-02"));
    });
    it('should have a user reference', () => {
        expect(lend.userId).toExist();
        expect(lend.userId.toString()).toEqual('111111111111111111110003');
    });
    it('should have a event reference', () => {
      expect(lend.eventId).toExist();
      expect(lend.eventId.toString()).toEqual('111111111111111111111111');
    });
    it('should have a resource reference', () => {
      expect(lend.resourceId).toExist();
      expect(lend.resourceId.toString()).toEqual('111111111111111111000003');
    })
});
