var app = angular.module('js');

app.controller('EventNewCtrl', function($scope, $location, EventsSvc, NotificationSvc) {
	$scope.title = 'Neues Programm erstellen';
	// default values
	$scope.isInternal = false;

	EventsSvc.getLocations().success(function(locs) {
		$scope.locations = locs;
	});

	$scope.save = function() {
		if($scope.eventForm.$valid) {
			EventsSvc.create({
				name: $scope.name,
				description: $scope.description,
				type: $scope.type,
				location: $scope.location,
				startDate: $scope.startDate,
				endDate: $scope.endDate,
				visibleFrom: $scope.visibleFrom,
				visibleTo: $scope.visibleTo,
				budgetBusiness: $scope.budgetBusiness,
				budgetFood: $scope.budgetFood,
				info: $scope.info,
				isInternal: $scope.isInternal,
			}).success(function(ev) {
				$scope.name = null;
				$scope.description = null;
				$scope.type = null;
				$scope.location = null;
				$scope.startDate = null;
				$scope.endDate = null;
				$scope.visibleFrom = null;
				$scope.visibleTo = null;
				$scope.budgetBusiness = 0;
				$scope.budgetFood = 0;
				$scope.info = null;
				$scope.isInternal = false;

				NotificationSvc.notify('Neues Programm erfolgreich gespeichert');

				$location.path('/');
			});
		}
	};
});
