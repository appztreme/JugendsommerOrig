'use strict';
var expect = require('expect');

/**
 * check that no error occured and response status is as expected
 * for a executed supertest request
 **/
module.exports.checkResponseStatus = (err, res, expectedStatus) => {
    expect(err).toNotExist();
    expect(res).toExist();
    expect(res.status).toEqual(expectedStatus);
};
