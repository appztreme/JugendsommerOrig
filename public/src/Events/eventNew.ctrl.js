var app = angular.module('js');

app.controller('EventNewCtrl', function($scope, $location, EventsSvc, NotificationSvc) {
	$scope.title = 'Neues Programm erstellen';

	$scope.statusStartDate = { open: false }
	$scope.statusEndDate = { open: false }
	$scope.statusVisibleFrom = { open: false }
	$scope.statusVisibleTo = { open: false }

	$scope.openStartDate = function($event) { $scope.statusStartDate.open = true; }
	$scope.openEndDate = function($event) { $scope.statusEndDate.open = true; }
	$scope.openVisibleFrom = function($event) { $scope.statusVisibleFrom.open = true; }
	$scope.openVisibleTo = function($event) { $scope.statusVisibleTo.open = true; }

	$scope.save = function() {
		if($scope.eventForm.$valid) {
			EventsSvc.create({
				name: $scope.name,
				description: $scope.description,
				type: $scope.type,
				startDate: $scope.startDate,
				endDate: $scope.endDate,
				visibleFrom: $scope.visibleFrom,
				visibleTo: $scope.visibleTo,
				info: $scope.info
			}).success(function(ev) {
				$scope.name = null;
				$scope.description = null;
				$scope.type = null;
				$scope.startDate = null;
				$scope.endDate = null;
				$scope.visibleFrom = null;
				$scope.visibleTo = null;
				$scope.info = null;

				NotificationSvc.notify('Neues Programm erfolgreich gespeichert');

				$location.path('/');
			});
		}
	};
});
