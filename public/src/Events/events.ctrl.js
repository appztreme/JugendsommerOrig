var app = angular.module('js');

/**
 * EventsCtrl corresponds to events.html
 */
app.controller('EventsCtrl', function($scope, EventsSvc, IdentitySvc) {

	$scope.busyPromise = EventsSvc.find();

	//onload section
	if(IdentitySvc.isAdmin()) {
		EventsSvc.findAsAdmin().success(function(evs) {
			$scope.events = evs;
		});
	} else {
		EventsSvc.find().success(function(evs) {
			$scope.events = evs;
		});
	}
});
