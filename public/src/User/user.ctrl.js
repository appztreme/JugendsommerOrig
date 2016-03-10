var app = angular.module('js');

app.controller('UserNewCtrl', function($scope, $location, UserSvc, NotificationSvc) {

	$scope.addUser = function(firstName, lastName, userTel, userEmail, userName, pwd) {
		UserSvc.create(firstName, lastName, userTel, userEmail, userName, pwd).then(function(success) {
			NotificationSvc.notify('Neuer User erfolgreich angelegt');
			$location.path('/');
		});
	};

});
