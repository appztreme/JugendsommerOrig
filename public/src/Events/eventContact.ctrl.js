var app = angular.module('js');

app.controller('EventContactCtrl', function($scope, $routeParams, $location, NotificationSvc, EventsSvc) {

	$scope.title = 'Kontakte verwalten';

    $scope.isNewContactFormVisible = false;

    $scope.toggleVisibility = function() {
        $scope.isNewContactFormVisible = !$scope.isNewContactFormVisible;
    }

    $scope.saveContact = function() {
        console.log('contact will save');
    }

    EventsSvc.getAllContacts().success(function(cs) {
        console.log(cs)
        $scope.allContacts = cs;
    });

    EventsSvc.getContacts($routeParams.eventId).success(function(c) {
        $scope.assignedContacts = c.contacts;
    });
});