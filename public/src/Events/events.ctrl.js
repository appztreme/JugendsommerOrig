var app = angular.module('js');

app.controller('EventsCtrl', function($scope, $routeParams, $location, EventsSvc, IdentitySvc, $rootScope, $translate) {
	//$scope.busyPromise = EventsSvc.find();
	var host = $location.$$host.toLowerCase();
	$scope.isKiso = host.indexOf('kiso') !== -1

	$scope.lang = $translate.proposedLanguage() || $translate.user();

	$scope.isRegistrationWarningVisible = function() {
		var d = new Date('2018-02-12');
		d.setHours(18,58,0);
		var now = Date.now();
		return now < d.getTime();
	}

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
	});

	$scope.filterEvents = function(evs) {
		var result = [];
		for(var i=0; i < evs.length; i++) {
			if($routeParams.event) {
				if(decodeURI($routeParams.event) === evs[i].name) result.push(evs[i]);
			}
			else result.push(evs[i]);
		}
		return result;
	}

	$scope.cannotReserve = function(ev) {
		if(IdentitySvc.isAdmin()) return false;
		else {
			var visible = new Date(ev.visibleFrom);
			visible.setHours(18,58,0);
			if(Date.now() > visible.getTime()) return false;
			if(Date.now() > new Date(ev.deadline).getTime()) return false;
			return true;
		}
	}

	if(IdentitySvc.isAdmin()) {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByTypeAsAdmin($routeParams.location).success(function(evs) {
				$scope.events = $scope.filterEvents(evs);
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				EventsSvc.findBySummerLocationAsAdmin($routeParams.location).success(function(evs) {
					$scope.events = $scope.filterEvents(evs);
				});
			} else {
				EventsSvc.findByLocationAsAdmin($routeParams.location).success(function(evs) {
					$scope.events = $scope.filterEvents(evs);
				});
			}
		}
	} else {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByType($routeParams.location).success(function(evs) {
				$scope.events = $scope.filterEvents(evs);
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				EventsSvc.findBySummerLocation($routeParams.location).success(function(evs) {
					$scope.events = $scope.filterEvents(evs);
				});
			} else {
				EventsSvc.findByLocation($routeParams.location).success(function(evs) {
					$scope.events = $scope.filterEvents(evs);
				});
			}

		}
	}
});
