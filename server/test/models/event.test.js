var expect = require('expect');
var EventModel = require('./../../models/event');

describe('Event Model', function() {
    var ev = null;
    before(function() {
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
    it('should have a defined Schema', function() {
        expect(EventModel.schema).toExist();
    });
    it('should have a name string', function() {
        expect(ev.name).toExist();
        expect(ev.name).toEqual('test name');
    });
    it('should have a description string', function() {
        expect(ev.description).toExist();
        expect(ev.description).toEqual('test description');
    });
    it('should have a info string', function() {
        expect(ev.info).toExist();
        expect(ev.info).toEqual('test info');
    });
    it('should have a startDate date', function() {
        expect(ev.startDate).toExist();
        expect(ev.startDate).toEqual(new Date(2016,1,1));
    });
    it('should have an endDate date', function() {
        expect(ev.endDate).toExist();
        expect(ev.endDate).toEqual(new Date(2016,3,5));
    });
    it('should have a visibleFrom date', function() {
        expect(ev.visibleFrom).toExist();
        expect(ev.visibleFrom).toEqual(new Date(2016,1,1));
    });
    it('should hava a visibleTo date', function() {
        expect(ev.visibleTo).toExist();
        expect(ev.visibleTo).toEqual(new Date(2016,7,5));
    });
});
