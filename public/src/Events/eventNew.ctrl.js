var app = angular.module('js');

app.controller('EventNewCtrl', function($scope, $location, EventsSvc, NotificationSvc) {
	$scope.title = 'Neues Programm erstellen';
	// default values
	$scope.isInternal = false;

	EventsSvc.getLocations().success(function(locs) {
		$scope.locations = locs;
	});

	function getItalianLocation(name) {
		for(var i = 0; i < $scope.locations.length; i++) {
			if($scope.locations[i].name === name)
				return $scope.locations[i].name_it;
		}
		return name;
	}

	$scope.save = function() {
		if($scope.eventForm.$valid) {
			EventsSvc.create({
				name: $scope.name,
				name_it: $scope.name_it,
				description: $scope.description,
				description_it: $scope.description_it,
				type: $scope.type,
				location: $scope.location,
				location_it: getItalianLocation($scope.location),
				startDate: $scope.startDate,
				endDate: $scope.endDate,
				visibleFrom: $scope.visibleFrom,
				visibleTo: $scope.visibleTo,
				deadline: $scope.deadline,
				budgetBusiness: $scope.budgetBusiness,
				budgetFood: $scope.budgetFood,
				info: $scope.info,
				info_it: $scope.info_it,
				isInternal: $scope.isInternal,
			}).success(function(ev) {
				$scope.name = null;
				$scope.name_it = null;
				$scope.description = null;
				$scope.description_it = null;
				$scope.type = null;
				$scope.location = null;
				$scope.startDate = null;
				$scope.endDate = null;
				$scope.visibleFrom = null;
				$scope.visibleTo = null;
				$scope.deadline = null;
				$scope.budgetBusiness = 0;
				$scope.budgetFood = 0;
				$scope.info = null;
				$scope.info_it = null;
				$scope.isInternal = false;

				NotificationSvc.notify('Neues Programm erfolgreich gespeichert');

				$location.path('/');
			});
		}
	};
});
