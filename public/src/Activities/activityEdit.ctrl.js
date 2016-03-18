var app = angular.module('js');

app.controller('ActivityEditCtrl', function($scope, $routeParams, $location, NotificationSvc, ActivitiesSvc) {
	$scope.title = 'Woche ändern';

	$scope.save = function() {
		if($scope.activityForm.$valid) {
			$scope.activity.name = $scope.name;
			$scope.activity.description = $scope.description;
			$scope.activity.startDate = $scope.startDate;
			$scope.activity.endDate = $scope.endDate;
			$scope.activity.maxParticipants = $scope.maxParticipants;
			$scope.activity.queueSize = $scope.queueSize;

			ActivitiesSvc.update( $scope.activity
			).success(function(activity) {
				$scope.name = null;
				$scope.description = null;
				$scope.startDate = null;
				$scope.endDate = null;
				$scope.maxParticipants = 0;
				$scope.queueSize = 0;
			})
			.then(function() {
				NotificationSvc.notify('Aenderungen erfolgreich gespeichert');
				$location.path('/activities/' + ActivitiesSvc.eventId);
			});
		}
	};

	ActivitiesSvc.findById($routeParams.activityId).success(function(activity) {
		$scope.activity = activity;
		$scope.name = activity.name;
		$scope.description = activity.description;
		$scope.startDate = new Date(activity.startDate);
		$scope.endDate = new Date(activity.endDate);
		$scope.maxParticipants = activity.maxParticipants;
		$scope.queueSize = activity.queueSize;
	});
});
