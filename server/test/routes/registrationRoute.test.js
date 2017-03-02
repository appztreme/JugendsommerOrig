'use strict';

const expect = require('expect');
const expectExpress = require('expect-express');
expect.extend(expectExpress);
const route = require('./../../routes/registrationRoute');

describe.only('REGISTRATION route', () => {
    describe('GET /', () => {
        it('should be a GET route', () => {
            expect(route).toHaveRoute('GET', '/');
        });
        it('should include authentication middleware', () => {
            console.log("XXX:",expectExpress.helper.getRoute(route, 'GET', '/').route.stack[0]);
            expect(expectExpress.helper.getRoute(route, 'GET', '/')).toHaveMiddleware();
        });
    });
    describe('GET /:registrationId', () => {
        it('should be a GET route', () => {
            expect(route).toHaveRoute('GET', '/:registrationId');
        });
        it('should have registrationId parameter', () => {
            expect(expectExpress.helper.getRoute(route, 'GET', '/:registrationId')).toHaveRouteParameter('registrationId');
        });
    });
});
