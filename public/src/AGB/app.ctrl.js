var app = angular.module('js');

app.controller('ApplicationCtrl', function($scope, IdentitySvc) {
	$scope.iSvc = IdentitySvc;
});
