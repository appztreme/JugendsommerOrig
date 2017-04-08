var app = angular.module('js');

app.controller('EventContactCtrl', function($scope, $routeParams, $location, NotificationSvc, EventsSvc) {

	$scope.title = 'Kontakte verwalten';

    EventsSvc.getContacts($routeParams.eventId)
        .success(function(c) {
            console.log(c);
            $scope.assignedContacts = c.contacts;
        });
});