var app = angular.module('js');

app.controller('ActivityNewCtrl', function($scope, $location, NotificationSvc, ActivitiesSvc) {
	$scope.title = 'Woche hinzufügen';
	
	$scope.statusStartDate = { open: false }
	$scope.statusEndDate = { open: false }

	$scope.openStartDate = function($event) { $scope.statusStartDate.open = true; }
	$scope.openEndDate = function($event) { $scope.statusEndDate.open = true; }

	$scope.save = function() {
		if($scope.name) {
			ActivitiesSvc.create({
				name: $scope.name,
				description: $scope.description,
				startDate: $scope.startDate,
				endDate: $scope.endDate,
				maxParticipants: $scope.maxParticipants,
				queueSize: $scope.queueSize,
				eventId: ActivitiesSvc.eventId
			}).success(function(activity) {
				$scope.name = null;
				$scope.description = null;
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
