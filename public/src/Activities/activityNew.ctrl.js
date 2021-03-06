var app = angular.module('js');

app.controller('ActivityNewCtrl', function($scope, $location, NotificationSvc, ActivitiesSvc) {
	$scope.title = 'Woche hinzufügen';

	$scope.save = function() {
		if($scope.name) {
			ActivitiesSvc.create({
				name: $scope.name,
				name_it: $scope.name_it,
				description: $scope.description,
				description_it: $scope.description_it,
				startDate: $scope.startDate,
				endDate: $scope.endDate,
				maxParticipants: $scope.maxParticipants,
				queueSize: $scope.queueSize,
				eventId: ActivitiesSvc.eventId
			}).success(function(activity) {
				$scope.name = null;
				$scope.name_it = null;
				$scope.description = null;
				$scope.description_it = null;
				$scope.startDate = null;
				$scope.endDate = null;
				$scope.maxParticipants = 0;
				$scope.queueSize = 0;
			}).then(function() {
				NotificationSvc.notify('Detail erfolgreich erstellt');
				$location.path('/activities/' + ActivitiesSvc.eventId);
			});
		}
	};


});
