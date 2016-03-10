var app = angular.module('js');

app.controller('LoginCtrl', function($scope, AuthenticationSvc, NotificationSvc, IdentitySvc) {
	$scope.identity = IdentitySvc;

	$scope.signin = function(username, password) {
		AuthenticationSvc.signin(username, password)
			.then(function(success) {
				if(success) {
					NotificationSvc.notify('Sie haben sich erfolgreich angemeldet');
				} else {
					NotificationSvc.warn('Ihre User Passwort Kombination konnte nicht gefunden werden. Legen Sie einen neuen User an.');
				}
			});
	};

	$scope.signout = function() {
		AuthenticationSvc.signout()
			.then(function(success) {
				NotificationSvc.notify('Sie haben sich erfolgreich abgemeldet');
				$scope.username = null;
				$scope.password = null;
			});
	};

});
