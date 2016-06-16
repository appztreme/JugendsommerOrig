'use strict'
let expect = require('expect');
let ResourceModel = require('./../../models/resource');

describe('Resource Model', () => {
    var res = null;
    before(() => {
        res = new ResourceModel({
            name: 'test name',
            description: 'test description',
            type: 'test type'
        });
    });
    it('should have a defined Schema', () => {
        expect(ResourceModel.schema).toExist();
    });
    it('should have a name string', () => {
        expect(res.name).toExist();
        expect(res.name).toEqual('test name');
    });
    it('should have a description string', () => {
      expect(res.description).toExist();
      expect(res.description).toEqual('test description');
    });
    it('should have a type string', () => {
      expect(res.type).toExist();
      expect(res.type).toEqual('test type');
    });
});
