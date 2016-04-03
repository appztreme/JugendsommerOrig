var app = angular.module('js');

app.controller('UserTokenRequestCtrl', function($scope, $location, UserSvc, NotificationSvc) {

	$scope.sendTokenToUser = function(userName) {
    UserSvc.sendUserTokenMail(userName)
      .error(function(err) {
        NotificationSvc.warn("Fehler beim Versenden des Emails");
      })
      .success(function(success) {
        NotificationSvc.notify("Email wurde versendet");
        $location.path('/userNewPwd');
      });
	};
});
