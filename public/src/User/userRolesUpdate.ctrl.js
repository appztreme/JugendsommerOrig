var app = angular.module('js');

app.controller('UserRolesUpdateCtrl', function($scope, $location, UserSvc, $routeParams, NotificationSvc) {
	$scope.save = function() {
		//console.log("event", $scope.event);
		UserSvc.updateRoles($scope.user._id, JSON.parse($scope.event)._id, $scope.location, $scope.user.roles)
			.error(function(err) {
				NotificationSvc.warn("err");
			})
			.success(function(success) {
				NotificationSvc.notify('Berechtigung geändert');
				$location.path('/userRolesSearch');
			})
	}

	$scope.$watch('curRole', function(newValue, oldValue) {
		if(newValue == 'admin') {
			$scope.user.roles = ['admin'];
			$scope.location = null;
			$scope.event = null;
		}
		if(newValue == 'fadmin') {
			$scope.user.roles = ['fadmin'];
			$scope.location = null;
		}
		if(newValue == 'ladmin') {
			$scope.user.roles = ['ladmin'];
			$scope.event = null;
		}
	});

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
			if(user.roles.indexOf('fadmin') !== -1) $scope.curRole = 'fadmin';
			if(user.roles.indexOf('ladmin') !== -1) $scope.curRole = 'ladmin';
			if(user.roles.indexOf('admin') !== -1) $scope.curRole = 'admin';
			if(user.location) $scope.location = user.location;

			// if(user.eventId) {
			// 	for(var ev in $scope.events) {
			// 		var evObj = $scope.events[ev];
			// 		if(evObj._id === user.eventId._id) { $scope.event = evObj; console.log("sel ev", $scope.event); break; }
			// 	}
			// }
		});
});
