var app = angular.module('js');

app.controller('EventEditCtrl', function($scope, $routeParams, $location, NotificationSvc, EventsSvc) {

	$scope.title = 'Programm &auml;ndern';

	$scope.save = function() {
		if($scope.eventForm.$valid) {
			$scope.event.name = $scope.name;
			$scope.event.description = $scope.description;
			$scope.event.type = $scope.type;
			$scope.event.location = $scope.location;
			$scope.event.startDate = $scope.startDate;
			$scope.event.endDate = $scope.endDate;
			$scope.event.visibleFrom = $scope.visibleFrom;
			$scope.event.visibleTo = $scope.visibleTo;
			$scope.event.budgetBusiness = $scope.budgetBusiness;
			$scope.event.budgetFood = $scope.budgetFood;
			$scope.event.info = $scope.info;

			EventsSvc.update($scope.event)
			.then(function(ev) {
				NotificationSvc.notify('Aenderungen erfolgreich gespeichert');
				$location.path('/');
			});
		}
	};

	EventsSvc.findById($routeParams.eventId).success(function(ev) {
		$scope.event = ev;
		$scope.name = ev.name;
		$scope.description = ev.description;
		$scope.type = ev.type;
		$scope.location = ev.location;
		$scope.startDate = new Date(ev.startDate);
		$scope.endDate = new Date(ev.endDate);
		$scope.visibleFrom = new Date(ev.visibleFrom);
		$scope.visibleTo = new Date(ev.visibleTo);
		$scope.budgetBusiness = ev.budgetBusiness;
		$scope.budgetFood = ev.budgetFood;
		$scope.info = ev.info;
	});
});
