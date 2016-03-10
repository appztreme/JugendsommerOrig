var app = angular.module('js');

app.controller('ActivitiesCtrl', function($scope, $routeParams, ActivitiesSvc) {
	$scope.busyPromise = ActivitiesSvc.findByEventId($routeParams.eventId);

    $scope.canReserve = function(activity) {
        return activity.curParticipants < activity.maxParticipants;
    };

    $scope.canQueue = function(activity) {
        return activity.curParticipants >= activity.maxParticipants &&
               activity.curParticipants < (activity.maxParticipants + activity.queueSize);
    };

    $scope.canNotReserve = function(activity) {
        return activity.curParticipants >= (activity.maxParticipants + activity.queueSize);
    };

    $scope.statusMessage = function(activity) {
        if($scope.canReserve(activity)) return "Anmeldungen für " + activity.maxParticipants + " Plätze";
        if($scope.canQueue(activity)) return "Nur mehr Anmeldung auf Warteliste möglich!";
        if($scope.canNotReserve(activity)) return "Ausgebucht. Keine Anmeldung mehr möglich";
    };


    $scope.IsReserveable = function(activity) {
	return !iSvc.isAuthenticated() || canNotReserve(activity);
    };

	ActivitiesSvc.eventId = $routeParams.eventId;
	ActivitiesSvc.findByEventId($routeParams.eventId).then(function(response) {
		$scope.activities = response.data;	
	});
});
