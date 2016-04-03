var app = angular.module('js');

app.controller('UserUpdatePwdCtrl', function($scope, $location, UserSvc, NotificationSvc) {

	$scope.updatePwd = function(userName, userToken, newPassword) {
    UserSvc.updatePassword(userName, userToken, newPassword)
      .error(function(err) {
				if(err.indexOf('Security Token Mismatch') > 1) {
					NotificationSvc.warn("Der Sicherheits-Code stimmt nicht überein.");
				} else {
        	NotificationSvc.warn("Fehler beim Ändern des Passworts");
				}
      })
      .success(function(success) {
        NotificationSvc.notify("Ihr Password wurde geändert.");
        $location.path('/');
      });
	};
});
