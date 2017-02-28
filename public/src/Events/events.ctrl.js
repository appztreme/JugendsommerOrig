var app = angular.module('js');

app.controller('EventsCtrl', function($scope, $routeParams, $location, EventsSvc, IdentitySvc) {
	//$scope.busyPromise = EventsSvc.find();
	var host = $location.$$host.toLowerCase();
	//var url = $location.url();

	if(IdentitySvc.isAdmin()) {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByTypeAsAdmin($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				EventsSvc.findBySummerLocationAsAdmin($routeParams.location).success(function(evs) {
					$scope.events = evs;
				});
			} else {
				EventsSvc.findByLocationAsAdmin($routeParams.location).success(function(evs) {
					$scope.events = evs;
				});
			}
		}
	} else {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByType($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				EventsSvc.findBySummerLocation($routeParams.location).success(function(evs) {
					$scope.events = evs;
				});
			} else {
				EventsSvc.findByLocation($routeParams.location).success(function(evs) {
					$scope.events = evs;
				});
			}

		}
	}
});
