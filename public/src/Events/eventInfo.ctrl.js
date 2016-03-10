var app = angular.module('js');

app.controller('EventInfoCtrl', function($scope, $routeParams, EventsSvc) {
	$scope.busyPromise = EventsSvc.findById($routeParams.eventId);

	EventsSvc.findById($routeParams.eventId).success(function(ev) {
		$scope.event = ev;	
		$scope.info = ev.info;
	});
});
