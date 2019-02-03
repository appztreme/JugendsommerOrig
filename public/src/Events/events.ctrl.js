var app = angular.module('js');

app.controller('EventsCtrl', function($scope, $routeParams, $location, EventsSvc, IdentitySvc, $rootScope, $translate, PlatformSvc, NotificationSvc) {
	//$scope.busyPromise = EventsSvc.find();
	var host = $location.$$host.toLowerCase();
	$scope.isKiso = host.indexOf('kiso') !== -1
	$scope.platform = PlatformSvc;
	$scope.lang = $translate.proposedLanguage() || $translate.user();

	$scope.isRegistrationWarningVisible = function() {
		var d = new Date('2018-03-15');
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
			visible.setHours(19,0,0);
			var deadline = new Date(ev.visibleTo);
			console.log("visible", visible, deadline, new Date(Date.now()));
			// if((new Date(ev.deadline).getTime()) > Date.now()) return true;
			if(Date.now() > visible.getTime() &&
		       Date.now() < deadline) return false;
			return true;
		}
	}

	$scope.sendReceiptEmail = function(evid) {
		EventsSvc.sendReceiptEmail(evid).success(function(r) {
			if(r.success) NotificationSvc.notify("Erfolgreich verschickt");
			else NotificationSvc.warn("Fehler beim Verschicken");
		});
	}

	$scope.sendReminderEmail = function(evid) {
		EventsSvc.sendReminderEmail(evid).success(function(r) {
			if(r.success) NotificationSvc.notify("Erfolgreich verschickt");
			else NotificationSvc.warn("Fehler beim Verschicken");
		});
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
