var app = angular.module('js');

app.controller('MyRegistrationsCtrl', function($scope, $location, $route, RegistrationSvc, IdentitySvc) {
	$scope.busyPromise = RegistrationSvc.findByUser(IdentitySvc.currentUser._id);

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	RegistrationSvc.findByUser(IdentitySvc.currentUser._id).success(function(registrations) {
		$scope.registrations = registrations;
		$scope.user = IdentitySvc.currentUser;
	});
});
