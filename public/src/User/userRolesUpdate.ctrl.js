var app = angular.module('js');

app.controller('UserRolesUpdateCtrl', function($scope, $route, $location, UserSvc, $routeParams, NotificationSvc) {
	$scope.save = function() {
		UserSvc.updateRoles($scope.user._id, $scope.curRole, $scope.areaId, $scope.areaName)
			.error(function(err) {
				NotificationSvc.warn("err");
			})
			.success(function(success) {
				NotificationSvc.notify('Berechtigung geändert');
				$route.reload();
			})
	}

	$scope.deleteRole = function(role, areaId, areaName) {
		UserSvc.deleteRole($scope.user._id, role, areaId, areaName)
			.error(function(err) {
				NotificationSvc.warn("err");
			})
			.success(function(success) {
				NotificationSvc.notify('Berechtigung gelöscht');
				$route.reload();
			})
	}

	$scope.findEvent = function(eventId) {
		if($scope.events) {
			for(var i=0; i < $scope.events.length; i++) {
				if($scope.events[i]._id === eventId) return $scope.events[i];
			}
		}	
		return null;
	}

	$scope.$watch('event', function(newValue, oldValue) {
		$scope.areaId = newValue;
		var newEvent = $scope.findEvent(newValue);
		$scope.areaName = (newEvent) ? newEvent.location + ' - ' + newEvent.name : null;
	});

	$scope.$watch('location', function(newValue, oldValue) {
		$scope.areaId = null;
		$scope.areaName = newValue;
	});

	$scope.displayRole = function(role) {
		if(role === "admin") return "Admin";
		else if(role === "fadmin") return "Programm-Admin";
		else if(role === "ladmin") return "Ort-Admin";
		else return "keine Rolle";
	}

	UserSvc.getEvents()
		.success(function(events) {
			console.log("events", events);
			$scope.events = events;
		});
    UserSvc.getLocations()
		.success(function(locations) {
			$scope.locations = locations;
		});
    $scope.isFadmin = $scope.isLadmin = $scope.isAdmin = false;
	UserSvc.findById($routeParams.userId)
		.success(function(user) {
			$scope.user = user;
		});
});
