'use strict'
let expect = require('expect');
let ActivityModel = require('./../../models/activity');

describe('Activity Model', () => {
    var act = null;
    before(() => {
        act = new ActivityModel({
            name: 'test name',
            description: 'test description',
            startDate: new Date(2016,1,1),
            endDate: new Date(2016,3,5),
            eventId: '111111111111111111111111',
            maxParticipants: 5,
            queueSize: 3
        });
    });
    it('should have a defined Schema', () => {
        expect(ActivityModel.schema).toExist();
    });
    it('should have a name string', () => {
        expect(act.name).toExist();
        expect(act.name).toEqual('test name');
    });
    it('should have a description string', () => {
        expect(act.description).toExist();
        expect(act.description).toEqual('test description');
    });
    it('should have a startDate date', () => {
        expect(act.startDate).toExist();
        expect(act.startDate).toEqual(new Date(2016,1,1));
    });
    it('should have an endDate date', () => {
        expect(act.endDate).toExist();
        expect(act.endDate).toEqual(new Date(2016,3,5));
    });
    it('should have an eventId reference', () => {
        expect(act.eventId).toExist();
        expect(act.eventId.toString()).toEqual('111111111111111111111111');
    });
    it('should have a maxParticipants number', () => {
        expect(act.maxParticipants).toExist();
        expect(act.maxParticipants).toEqual(5);
    });
    it('should have a queueSize number', () => {
        expect(act.queueSize).toExist();
        expect(act.queueSize).toEqual(3);
      });
    it('should have a curParticipants number which defaults to 0', () => {
        expect(act.curParticipants).toEqual(0);
    });
})
