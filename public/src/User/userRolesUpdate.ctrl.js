var app = angular.module('js');

app.controller('UserRolesUpdateCtrl', function($scope, $location, UserSvc, $routeParams, NotificationSvc) {
	$scope.save = function() {
		UserSvc.updateRoles($scope.user._id, $scope.curRole, $scope.areaId, $scope.areaName)
			.error(function(err) {
				NotificationSvc.warn("err");
			})
			.success(function(success) {
				NotificationSvc.notify('Berechtigung geändert');
				//$location.path('/userRolesSearch');
			})
	}

	$scope.deleteRole = function(role, areaId, areaName) {
		UserSvc.deleteRole($scope.user._id, role, areaId, areaName)
			.error(function(err) {
				NotificationSvc.warn("err");
			})
			.success(function(success) {
				NotificationSvc.notify('Berechtigung gelöscht');
				//$location.path('/userRolesSearch');
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
			console.log("roles", $scope.user);
			//console.log("user", user);
			//if(user.roles.indexOf('fadmin') !== -1) $scope.curRole = 'fadmin';
			//if(user.roles.indexOf('ladmin') !== -1) $scope.curRole = 'ladmin';
			//if(user.roles.indexOf('admin') !== -1) $scope.curRole = 'admin';
			//if(user.location) $scope.location = user.location;

			// if(user.eventId) {
			// 	for(var ev in $scope.events) {
			// 		var evObj = $scope.events[ev];
			// 		if(evObj._id === user.eventId._id) { $scope.event = evObj; console.log("sel ev", $scope.event); break; }
			// 	}
			// }
		});
});
