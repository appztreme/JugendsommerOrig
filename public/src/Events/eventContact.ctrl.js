var app = angular.module('js');

app.controller('EventContactCtrl', function($scope, $routeParams, $route, $location, NotificationSvc, EventsSvc) {

    $scope.title = 'Kontakte verwalten';
    
    $scope.inlineEdit = false;

    $scope.toggleInlineEdit = function() {
        $scope.inlineEdit = !$scope.inlineEdit;
    }

    $scope.updateContact = function(contact) {
        EventsSvc.updateContact(contact._id, contact.phoneNumber, contact.email)
            .success(function(ev) {
                    NotificationSvc.notify("Kontakt wurde erfolgreich geändert");
                    $route.reload();
            })
            .error(function(errC) {
                NotificationSvc.warn("Kontakt konnte nicht geändert werden");
            });
    }

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
       //console.log($scope.firstName, $scope.lastName, $scope.phoneNumber, $scope.email, $scope.type);
       EventsSvc.createContact({
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            phoneNumber: $scope.phoneNumber,
            email: $scope.email
       })
       .success(function(c) {
            EventsSvc.addContact($routeParams.eventId, c._id, $scope.role)
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
        EventsSvc.addContact($routeParams.eventId, $scope.searchResultId, $scope.contactRole)
            .success(function(ev) {
                NotificationSvc.notify("Kontakt wurde gespeichert");
            })
            .error(function(err) {
                NotificationSvc.warn("Kontakt konnte nicht gespeichert werden");
            });
        $route.reload();
    }

    $scope.removeContact = function(contactId, role) {
        EventsSvc.removeContact($routeParams.eventId, contactId, role)
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
        $scope.assignedContacts = c.contactRels;
    });

    EventsSvc.getContactsForEvent($routeParams.eventId).success(function(cs) {
        $scope.activityContacts = cs;
    });
});