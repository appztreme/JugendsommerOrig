var app = angular.module('js');

app.controller('ActivityEditCtrl', function($scope, $routeParams, $location, NotificationSvc, ActivitiesSvc, PlatformSvc) {
	$scope.title = 'Woche ändern';
	$scope.platform = PlatformSvc;

	$scope.save = function() {
		if($scope.activityForm.$valid) {
			$scope.activity.name = $scope.name;
			$scope.activity.name_it = $scope.name_it;
			$scope.activity.description = $scope.description;
			$scope.activity.description_it = $scope.description_it;
			$scope.activity.startDate = $scope.startDate;
			$scope.activity.endDate = $scope.endDate;
			$scope.activity.maxParticipants = $scope.maxParticipants;
			$scope.activity.queueSize = $scope.queueSize;

			ActivitiesSvc.update( $scope.activity
			).success(function(activity) {
				$scope.name = null;
				$scope.name_it = null;
				$scope.description = null;
				$scope.description_it = null;
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
		$scope.name_it = activity.name_it;
		$scope.description = activity.description;
		$scope.description_it = activity.description_it;
		$scope.startDate = new Date(activity.startDate);
		$scope.endDate = new Date(activity.endDate);
		$scope.maxParticipants = activity.maxParticipants;
		$scope.queueSize = activity.queueSize;
	});
});
