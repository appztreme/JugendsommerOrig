var app = angular.module('js');

app.controller('LoginCtrl', function($scope, AuthenticationSvc, NotificationSvc, IdentitySvc, $rootScope, $translate) {
	$scope.identity = IdentitySvc;

	$scope.lang = $translate.proposedLanguage() || $translate.user();

	//default values:
	$scope.msgLoginSuccess = "Sie haben sich erfolgreich angemeldet";
    $scope.msgLogoutSuccess = "Sie haben sich erfolgreich abgemeldet";
    $scope.msgLoginNotFound = "Ihre User Passwort Kombination konnte nicht gefunden werden. Legen Sie einen neuen User an.";

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();

		$translate(['LOGIN.MSG_LOGIN_SUCCESS', 'LOGIN.MSG_LOGOUT_SUCCESS', 'LOGIN.MSG_LOGIN_NOTFOUND'])
			.then(function (translations) {
    			$scope.msgLoginSuccess = translations['LOGIN.MSG_LOGIN_SUCCESS'];
    			$scope.msgLogoutSuccess = translations['LOGIN.MSG_LOGOUT_SUCCESS'];
    			$scope.msgLoginNotFound = translations['LOGIN.MSG_LOGIN_NOTFOUND'];
  			}, function (translationIds) {
				$scope.msgLoginSuccess = translationIds.login_msg_login_success;
    			$scope.msgLogoutSuccess = translationIds.login_msg_logout_success;
    			$scope.msgLoginNotFound = translationIds.login_msg_login_notfound;
  			});
    });

	$scope.signin = function(username, password) {
		AuthenticationSvc.signin(username, password)
			.then(function(success) {
				if(success) {
					NotificationSvc.notify($scope.msgLoginSuccess);
				} else {
					NotificationSvc.warn($scope.msgLoginNotFound);
				}
			});
	};

	$scope.signout = function() {
		AuthenticationSvc.signout()
			.then(function(success) {
				NotificationSvc.notify($scope.msgLogoutSuccess);
				$scope.username = null;
				$scope.password = null;
			});
	};

});
