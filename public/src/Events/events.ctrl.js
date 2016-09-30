var app = angular.module('js');

/**
 * EventsCtrl corresponds to events.html
 */
app.controller('EventsCtrl', function($scope, $location, EventsSvc, IdentitySvc) {

	$scope.busyPromise = EventsSvc.find();

	//onload section
	if(IdentitySvc.isAdmin()) {
		EventsSvc.findAsAdmin().success(function(evs) {
			$scope.events = evs;
		});
	} else {
		var loc = $location.search();
		console.log("type",loc);
		if(loc.type) {
			console.log("type query path");
			EventsSvc.findByType(loc.type).success(function(evs) {
				$scope.events = evs;
			});
		}
		else
			EventsSvc.find().success(function(evs) {
				console.log("found events", evs);
				$scope.events = evs;
			});
	}
});
