'use strict';

const expect = require('expect');
const expectExpress = require('expect-express');
expect.extend(expectExpress);
const route = require('./../../routes/registrationRoute');
const auth = require('./../../routes/authentication');
const controller = require('./../../controller/registrationCtrl');

describe.only('REGISTRATION route', () => {
    describe('GET /', () => {
        it('should be a GET route', () => {
            expect(route).toHaveRoute('GET', '/');
        });
        it('should include authentication middleware', () => {
            expect(expectExpress.helper.getRoute(route, 'GET', '/')).toHaveMiddleware(auth.requiresRole());
        });
        it('should call controller.find', () => {
            expect(expectExpress.helper.getRoute(route, 'GET', '/')).toHaveMiddleware(controller.find);
        });
    });
    describe('GET /:registrationId', () => {
        it('should be a GET route', () => {
            expect(route).toHaveRoute('GET', '/:registrationId');
        });
        it('should have registrationId parameter', () => {
            expect(expectExpress.helper.getRoute(route, 'GET', '/:registrationId')).toHaveRouteParameter('registrationId');
        });
        it('should include authentication middleware', () => {
            expect(expectExpress.helper.getRoute(route, 'GET', '/:registrationId')).toHaveMiddleware(auth.requiresRole());
        });
        it('should call controller.findById', () => {
            expect(expectExpress.helper.getRoute(route, 'GET', '/:registrationId')).toHaveMiddleware(controller.findById);
        });
    });
    describe('GET /selectableEventActivities', () => {
        it('should be a GET route', () => {
            expect(route).toHaveRoute('GET', '/selectableEventActivities');
        });
        /*it('should call controller.getSelectableEventActivities', () => {
            console.log(expectExpress.helper.getRoute(route, 'GET', '/selectableEventActivities').route.stack[0].handle.toString());
            expect(expectExpress.helper.getRoute(route, 'GET', '/selectableEventActivities')).toHaveMiddleware(controller.getSelectableEventActivities);
        });*/
    });
});
