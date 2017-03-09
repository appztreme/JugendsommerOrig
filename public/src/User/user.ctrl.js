var app = angular.module('js');

app.controller('UserNewCtrl', function($scope, $location, UserSvc, NotificationSvc, $rootScope, $translate) {

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

	$scope.addUser = function(firstName, lastName, userTel, userEmail, userName, pwd) {
		UserSvc.create(firstName, lastName, userTel, userEmail, userName, pwd)
			.error(function(err) {
				if(err.indexOf('duplicate key error index') > -1) {
					var msgError = $scope.lang == 'de' ? 'Username ist schon vergeben' : 'Username ist schon vergeben';
					NotificationSvc.warn(msgError);
				}
			})
			.success(function(success) {
				var msgSuccess = $scope.lang == 'de' ? 'Neuer User erfolgreich angelegt' : 'Nuovo utente creato con successo';
				NotificationSvc.notify(msgSuccess);
				$location.path('/');
			});
	};

});
