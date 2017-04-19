var app = angular.module('js');

app.controller('PaymentCtrl', function($scope, $routeParams, $route, $templateCache, NotificationSvc, IdentitySvc, LendingSvc) {
	$scope.title = 'Auszahlung';
});