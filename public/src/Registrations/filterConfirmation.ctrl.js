var app = angular.module('js');

app.controller('FilterConfirmationCtrl', function($scope, RegistrationSvc, IdentitySvc, EventsSvc, NotificationSvc) {
    $scope.busyPromise = EventsSvc.find();
    
	EventsSvc.find().success(function(evs) {
        $scope.events = evs;
    });

    $scope.clearChildSelection = function() { $scope.selectedChild = null; }

    $scope.clearEventSelection = function() { $scope.eventId = null; }
    
    $scope.updateEventFilter = function() {
        RegistrationSvc.getChildrenPerEvent($scope.eventId).success(function(children) {
            for(var i = 0; i < children.length; i++) {
                children[i].birthday = new Date(children[i].birthday);
            }
            $scope.children = children;
            //console.log(children);
        });
    }

    $scope.canSend = function(selectedChild) {
        var c = angular.fromJson(selectedChild);
        return c && $scope.emailOpt && $scope.eventId; 
    }

    $scope.send = function() {
        var c = angular.fromJson($scope.selectedChild);
        if($scope.canSend()) {
            RegistrationSvc.sendConfirmationMailSingle($scope.eventId, c.firstName, c.lastName, c.birthday, $scope.emailOpt)
                .success(function(r) {
                    if(r.success) NotificationSvc.notify("Erfolgreich verschickt");
			        else NotificationSvc.warn("Fehler beim Verschicken");
                });
        }
    }
});