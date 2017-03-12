var app = angular.module('js');

app.controller('UserRolesUpdateCtrl', function($scope, $location, UserSvc, $routeParams) {

	// $scope.addUser = function(firstName, lastName, userTel, userEmail, userName, pwd) {
	// 	UserSvc.create(firstName, lastName, userTel, userEmail, userName, pwd)
	// 		.error(function(err) {
	// 			if(err.indexOf('duplicate key error index') > -1) {
	// 				NotificationSvc.warn("Username ist schon vergeben");
	// 			}
	// 		})
	// 		.success(function(success) {
	// 			NotificationSvc.notify('Neuer User erfolgreich angelegt');
	// 			$location.path('/');
	// 		});
	// };
	// $scope.$watch('isAdmin', function(oldValue, newValue) {
	// 	//$scope.isAdmin = !$scope.isAdmin;
	// 	if($scope.isAdmin) $scope.user.roles = ['admin'];
	// 	console.log($scope.user.roles);
	// });
	// $scope.$watch('isFadmin', function(oldValue, newValue) {
	// 	//$scope.isFadmin = !$scope.isFadmin;		
	// 	if($scope.isFadmin) $scope.user.roles = ['fadmin'];
	// 	console.log($scope.user.roles);
	// });
	// $scope.$watch('isLadmin', function(oldValue, newValue) {
	// 	//$scope.isLadmin = !$scope.isLadmin;
	// 	if($scope.isLadmin) $scope.user.roles = ['ladmin'];
	// 	console.log($scope.user.roles);
	// });

	$scope.updateRole = function(role) {
		if($scope.user) {
			console.log("isAdmin, isFadmin, isLadmin", $scope.isAdmin, $scope.isFadmin, $scope.isLadmin);
			if(role === 'ladmin') { $scope.user.roles = ['ladmin']; $scope.isLadmin = true; $scope.isFadmin = $scope.isAdmin = false; }
			if(role === 'fadmin') { $scope.user.roles = ['fadmin']; $scope.isFadmin = true; $scope.isLadmin = $scope.isAdmin = false; }
			if(role === 'admin') { $scope.user.roles = ['admin']; $scope.isAdmin = true; $scope.isLadmin = $scope.isFadmin = false; }
			console.log("foles", $scope.user.roles);
		}
	}

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
			console.log(user.roles);
			console.log(user.roles.indexOf('fadmin') !== -1);
			if(user.roles.indexOf('admin') !== -1) $scope.isAdmin = true;
			if(user.roles.indexOf('fadmin') !== -1) $scope.isFadmin = true;
			if(user.roles.indexOf('ladmin') !== -1) $scope.isLadmin = true;
		});
});
