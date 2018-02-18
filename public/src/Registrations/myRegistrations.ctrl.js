var app = angular.module('js');

app.controller('MyRegistrationsCtrl', function($scope, $location, $route, RegistrationSvc, IdentitySvc, $rootScope, $translate, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.findByUser(IdentitySvc.currentUser._id);

	// var host = $location.$$host.toLowerCase();
	// $scope.isKiso = host.indexOf('kiso') !== -1;
	$scope.platform = PlatformSvc;

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

	$scope.formatBool = function(b) {
		if(b) return $scope.lang == 'de' ? "ja" : "si";
		return $scope.lang == 'de' ? "nein" : "no";
	};

	RegistrationSvc.findByUser(IdentitySvc.currentUser._id).success(function(registrations) {
		$scope.registrations = registrations;
		$scope.user = IdentitySvc.currentUser;
	});
});
