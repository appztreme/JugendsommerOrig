var app = angular.module('js');

/**
 * EventsCtrl corresponds to events.html
 */
app.controller('EventsCtrl', function($scope, $routeParams, $location, EventsSvc, IdentitySvc) {

	$scope.busyPromise = EventsSvc.find();

	//onload section
	if(IdentitySvc.isAdmin()) {
		EventsSvc.findAsAdmin($routeParams.location).success(function(evs) {
			$scope.events = evs;
		});
	} else {
		EventsSvc.findByLocation($routeParams.location).success(function(evs) {
				$scope.events = evs;
		});
	}
});
