var app = angular.module('js');

app.controller('ApplicationCtrl', function($scope, IdentitySvc, $location) {
	$scope.iSvc = IdentitySvc;
	var host = $location.$$host.toLowerCase();
    $scope.isKiso = host.indexOf('kiso') !== -1;
});
