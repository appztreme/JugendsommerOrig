var app = angular.module('js');

app.controller('UserRolesUpdateCtrl', function($scope, $location, UserSvc) {

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

});
