var app = angular.module('js');

app.controller('UserRolesUpdateCtrl', function($scope, $location, UserSvc, $routeParams, NotificationSvc) {
	$scope.save = function() {
		console.log("event", $scope.user.eventId);
		UserSvc.updateRoles($scope.user._id, $scope.user.roles, $scope.user.eventId, $scope.location)
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
			$scope.user.eventId = null;
		}
		if(newValue == 'fadmin') {
			$scope.user.roles = ['fadmin'];
			$scope.location = null;
		}
		if(newValue == 'ladmin') {
			$scope.user.roles = ['ladmin'];
			$scope.user.eventId = null;
		}
	});

	UserSvc.getEvents()
		.success(function(events) {
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
			console.log("user", user);
			if(user.roles.indexOf('fadmin') !== -1) $scope.curRole = 'fadmin';
			if(user.roles.indexOf('ladmin') !== -1) $scope.curRole = 'ladmin';
			if(user.roles.indexOf('admin') !== -1) $scope.curRole = 'admin';
			if(user.location) $scope.location = user.location;
		});
});
