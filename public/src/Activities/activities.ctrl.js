var app = angular.module('js');

app.controller('ActivitiesCtrl', function($scope, $routeParams, ActivitiesSvc, $rootScope, $translate) {
	$scope.busyPromise = ActivitiesSvc.findByEventId($routeParams.eventId);

	$scope.type = $routeParams.type;

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

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

	$scope.getCountObj = function(activity) {
		return { count: activity.maxParticipants };
	}

    $scope.IsReserveable = function(activity) {
	return !iSvc.isAuthenticated() || canNotReserve(activity);
    };

	ActivitiesSvc.eventId = $routeParams.eventId;
	ActivitiesSvc.findByEventId($routeParams.eventId).then(function(response) {
		$scope.activities = response.data;
	});
});
