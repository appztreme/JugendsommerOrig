var app = angular.module('js');

app.controller('EventContactCtrl', function($scope, $routeParams, $route, $location, NotificationSvc, EventsSvc) {

	$scope.title = 'Kontakte verwalten';

    $scope.options = {
        shadowInput: false,
        highlightFirst: true,       
        searchMethod: "search",
        onSelect: "onContactSelect"
    };

    $scope.isNewContactFormVisible = false;

    $scope.toggleVisibility = function() {
        $scope.isNewContactFormVisible = !$scope.isNewContactFormVisible;
    }

    $scope.onContactSelect = function(sel) {
        $scope.searchResultId = sel.id;
    }

    $scope.search = function(query, deferred) {
        var result = [];
        for(var i=0; i < $scope.allContacts.length; i++) {
            var c = $scope.allContacts[i];
            if(c.firstName.indexOf(query) !== -1 || c.lastName.indexOf(query) !== -1) 
                result.push({value: c.lastName + ' ' + c.firstName, id: c._id});
        }

        deferred.resolve({results: result});
    }

    $scope.saveContact = function() {
        console.log('contact will save');
    }

    $scope.addContact = function() {
        console.log("add contact", $scope.searchResultId);
        EventsSvc.updateContacts($routeParams.eventId, $scope.searchResultId)
            .success(function(ev) {
                NotificationSvc.notify("Kontakt wurde gespeichert");
            })
            .error(function(err) {
                console.log(err);
                NotificationSvc.warn("Kontakt konnte nicht gespeichert werden");
            });
        $route.reload();
    }

    EventsSvc.getAllContacts().success(function(cs) {
        console.log(cs)
        $scope.allContacts = cs;
    });

    EventsSvc.getContacts($routeParams.eventId).success(function(c) {
        $scope.assignedContacts = c.contacts;
    });
});