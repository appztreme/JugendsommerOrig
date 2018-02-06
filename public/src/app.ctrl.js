var app = angular.module('js');

app.controller('ApplicationCtrl', function($scope, IdentitySvc, PlatformSvc, $location) {
	$scope.iSvc = IdentitySvc;
	PlatformSvc.host = $location.$$host.toLowerCase();
	$scope.platformSvc = PlatformSvc;
	window.document.title = PlatformSvc.getTitle();
});
