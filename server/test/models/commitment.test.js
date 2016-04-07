'use strict'
let expect = require('expect');
let CommitmentModel = require('./../../models/commitment');

describe('Commitment Model', () => {
    var commitment = null;
    before(() => {
        commitment = new CommitmentModel({
            name: 'test name',
            description: 'test description',
            date: new Date(2016,1,1),
            amount: 75.80,
            eventId: '111111111111111111111111',
            userId: '111111111111111111110003'
        });
    });
    it('should have a defined Schema', () => {
        expect(CommitmentModel.schema).toExist();
    });
    it('should have a name string', () => {
        expect(commitment.name).toExist();
        expect(commitment.name).toEqual('test name');
    });
    it('should have a description string', () => {
        expect(commitment.description).toExist();
        expect(commitment.description).toEqual('test description');
    });
    it('should have a date Date', () => {
        expect(commitment.date).toExist();
        expect(commitment.date).toEqual(new Date(2016,1,1));
    });
    it('should have an event reference', () => {
        expect(commitment.eventId).toExist();
        expect(commitment.eventId.toString()).toEqual('111111111111111111111111');
    });
    it('should have a user reference', () => {
        expect(commitment.userId).toExist();
        expect(commitment.userId.toString()).toEqual('111111111111111111110003');
    });
})
