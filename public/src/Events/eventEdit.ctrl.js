var app = angular.module('js');

app.controller('EventEditCtrl', function($scope, $routeParams, $location, NotificationSvc, EventsSvc) {

	$scope.title = 'Programm ändern';

	$scope.save = function() {
		if($scope.eventForm.$valid) {
			$scope.event.name = $scope.name;
			$scope.event.name_it = $scope.name_it;
			$scope.event.description = $scope.description;
			$scope.event.description_it = $scope.description_it;
			$scope.event.type = $scope.type;
			$scope.event.location = $scope.location;
			$scope.event.location_it = getItalianLocation($scope.location);
			$scope.event.startDate = $scope.startDate;
			$scope.event.endDate = $scope.endDate;
			$scope.event.visibleFrom = $scope.visibleFrom;
			$scope.event.visibleTo = $scope.visibleTo;
			$scope.event.deadline = $scope.deadline;
			$scope.event.budgetBusiness = $scope.budgetBusiness;
			$scope.event.budgetFood = $scope.budgetFood;
			$scope.event.info = $scope.info;
			$scope.event.info_it = $scope.info_it;
			$scope.event.isInternal = $scope.isInternal;

			EventsSvc.update($scope.event)
			.then(function(ev) {
				NotificationSvc.notify('Aenderungen erfolgreich gespeichert');
				$location.path('/');
			});
		}
	};

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

	EventsSvc.findById($routeParams.eventId).success(function(ev) {
		$scope.event = ev;
		$scope.name = ev.name;
		$scope.name_it = ev.name_it;
		$scope.description = ev.description;
		$scope.description_it = ev.description_it;
		$scope.type = ev.type;
		$scope.location = ev.location;
		$scope.location_it = ev.location_it;
		$scope.startDate = new Date(ev.startDate);
		$scope.endDate = new Date(ev.endDate);
		$scope.visibleFrom = new Date(ev.visibleFrom);
		$scope.visibleTo = new Date(ev.visibleTo);
		$scope.deadline = new Date(ev.deadline);
		$scope.budgetBusiness = ev.budgetBusiness;
		$scope.budgetFood = ev.budgetFood;
		$scope.info = ev.info;
		$scope.info_it = ev.info_it;
		$scope.isInternal = ev.isInternal;
	});
});
