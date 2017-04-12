var app = angular.module('js');

app.controller('ActivityContactCtrl', function($scope, $routeParams, $route, $location, NotificationSvc, ActivitiesSvc) {

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
        //console.log($scope.firstName, $scope.lastName, $scope.phoneNumber, $scope.email, $scope.role);
        ActivitiesSvc.createContact({
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            phoneNumber: $scope.phoneNumber,
            email: $scope.email
       })
       .success(function(c) {
            ActivitiesSvc.addContact($routeParams.activityId, c._id, $scope.role)
                .success(function(act) {
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
        ActivitiesSvc.addContact($routeParams.activityId, $scope.searchResultId, $scope.contactRole)
            .success(function(act) {
                NotificationSvc.notify("Kontakt wurde gespeichert");
            })
            .error(function(err) {
                NotificationSvc.warn("Kontakt konnte nicht gespeichert werden");
            });
        $route.reload();
    }

    $scope.removeContact = function(contactId, role) {
        ActivitiesSvc.removeContact($routeParams.activityId, contactId, role)
            .success(function(act) {
                NotificationSvc.notify("Kontakt wurde entfernt");
            })
            .error(function(err) {
                NotificationSvc.warn("Kontakt konnte nicht entfernt werden");
            });
        $route.reload();
    }

    ActivitiesSvc.getAllContacts().success(function(cs) {
        $scope.allContacts = cs;
    });

    ActivitiesSvc.getContacts($routeParams.activityId).success(function(c) {
        $scope.assignedContacts = c.contactRels;
    });
});