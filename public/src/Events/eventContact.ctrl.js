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
        console.log($scope.firstName, $scope.lastName, $scope.phoneNumber, $scope.email, $scope.type);
       EventsSvc.createContact({
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            phoneNumber: $scope.phoneNumber,
            email: $scope.email,
            type: $scope.type
       })
       .success(function(c) {
            EventsSvc.addContact($routeParams.eventId, c._id)
                .success(function(ev) {
                    NotificationSvc.notify("Kontakt wurde erfolgreich gespeichert");
                    $route.reload();
                })
                .error(function(errC) {
                    NotificationSvc.warn("Kontakt konnte nicht hinzugefügt werden");
                });
       })
       .error(function(err) {
            if(err.indexOf('duplicate key error index') > -1) {
				NotificationSvc.warn("Kontakt " + $scope.firstName + " " + $scope.lastName + " existiert bereits");
			} else {
                NotificationSvc.warn("Kontakt konnte nicht gespeichert werden");
            }
       });
    }

    $scope.addContact = function() {
        EventsSvc.addContact($routeParams.eventId, $scope.searchResultId)
            .success(function(ev) {
                NotificationSvc.notify("Kontakt wurde gespeichert");
            })
            .error(function(err) {
                NotificationSvc.warn("Kontakt konnte nicht gespeichert werden");
            });
        $route.reload();
    }

    $scope.removeContact = function(contactId) {
        EventsSvc.removeContact($routeParams.eventId, contactId)
            .success(function(ev) {
                NotificationSvc.notify("Kontakt wurde entfernt");
            })
            .error(function(err) {
                NotificationSvc.warn("Kontakt konnte nicht entfernt werden");
            });
        $route.reload();
    }

    EventsSvc.getAllContacts().success(function(cs) {
        $scope.allContacts = cs;
    });

    EventsSvc.getContacts($routeParams.eventId).success(function(c) {
        $scope.assignedContacts = c.contacts;
    });

    EventsSvc.getContactsForEvent($routeParams.eventId).success(function(cs) {
        console.log("activity", cs);
        $scope.activityContacts = cs;
    });
});