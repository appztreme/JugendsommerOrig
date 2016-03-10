var app = angular.module('js');

app.controller('EventEditCtrl', function($scope, $routeParams, $location, NotificationSvc, EventsSvc) {

	$scope.title = 'Programm &auml;ndern';

	$scope.statusStartDate = { open: false }
	$scope.statusEndDate = { open: false }
	$scope.statusVisibleFrom = { open: false }
	$scope.statusVisibleTo = { open: false }

	$scope.openStartDate = function($event) { $scope.statusStartDate.open = true; };
	$scope.openEndDate = function($event) { $scope.statusEndDate.open = true; }
	$scope.openVisibleFrom = function($event) { $scope.statusVisibleFrom.open = true; }
	$scope.openVisibleTo = function($event) { $scope.statusVisibleTo.open = true; }

	$scope.save = function() {
		if($scope.eventForm.$valid) {
			$scope.event.name = $scope.name;
			$scope.event.description = $scope.description;
			$scope.event.type = $scope.type;
			$scope.event.startDate = $scope.startDate;
			$scope.event.endDate = $scope.endDate;
			$scope.event.visibleFrom = $scope.visibleFrom;
			$scope.event.visibleTo = $scope.visibleTo;
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
		$scope.startDate = new Date(ev.startDate);
		$scope.endDate = new Date(ev.endDate);
		$scope.visibleFrom = new Date(ev.visibleFrom);
		$scope.visibleTo = new Date(ev.visibleTo);
		$scope.info = ev.info;
	});
});
