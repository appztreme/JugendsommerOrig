'use strict';
let expect = require('expect');
let EventModel = require('./../../models/event');

describe('Event Model', () => {
    let ev = null;
    before(() => {
        ev = new EventModel({
            name: 'test name',
            description: 'test description',
            type: 'summer',
            startDate: new Date(2016,1,1),
            endDate: new Date(2016,3,5),
            visibleFrom: new Date(2016,1,1),
            visibleTo: new Date(2016,7,5),
            info: 'test info'
        });
    });
    it('should have a defined Schema', () => {
        expect(EventModel.schema).toExist();
    });
    it('should have a name string', () => {
        expect(ev.name).toExist();
        expect(ev.name).toEqual('test name');
    });
    it('should have a description string', () => {
        expect(ev.description).toExist();
        expect(ev.description).toEqual('test description');
    });
    it('should have a info string', () => {
        expect(ev.info).toExist();
        expect(ev.info).toEqual('test info');
    });
    it('should have a startDate date', () => {
        expect(ev.startDate).toExist();
        expect(ev.startDate).toEqual(new Date(2016,1,1));
    });
    it('should have an endDate date', () => {
        expect(ev.endDate).toExist();
        expect(ev.endDate).toEqual(new Date(2016,3,5));
    });
    it('should have a visibleFrom date', () => {
        expect(ev.visibleFrom).toExist();
        expect(ev.visibleFrom).toEqual(new Date(2016,1,1));
    });
    it('should hava a visibleTo date', () => {
        expect(ev.visibleTo).toExist();
        expect(ev.visibleTo).toEqual(new Date(2016,7,5));
    });
});
