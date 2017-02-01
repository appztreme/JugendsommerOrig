var app = angular.module('js');

/**
 * EventsCtrl corresponds to events.html
 */
app.controller('EventsCtrl', function($scope, $routeParams, $location, EventsSvc, IdentitySvc) {

	$scope.busyPromise = EventsSvc.find();

	//onload section
	if(IdentitySvc.isAdmin()) {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByTypeAsAdmin($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
		else {
			EventsSvc.findByLocationAsAdmin($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
	} else {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByType($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
		else {
			EventsSvc.findByLocation($routeParams.location).success(function(evs) {
					$scope.events = evs;
			});
		}
	}
});
