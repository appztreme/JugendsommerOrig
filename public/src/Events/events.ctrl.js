var app = angular.module('js');

/**
 * EventsCtrl corresponds to events.html
 */
app.controller('EventsCtrl', function($scope, EventsSvc) {
	
	$scope.busyPromise = EventsSvc.find();
	
	//onload section
	EventsSvc.find().success(function(evs) {
		$scope.events = evs;	
	});
});
