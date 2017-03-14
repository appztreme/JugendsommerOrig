var app = angular.module('js');

app.controller('AgbEditCtrl', function($scope, $routeParams, $location, AgbsSvc, NotificationSvc, $rootScope, $translate) {
	$scope.activityId = $routeParams.activityId;
	$scope.type = $routeParams.type;

	console.log("xxx", $scope.activityId, $scope.type);
	
	var host = $location.$$host.toLowerCase();
    $scope.isKiso = host.indexOf('kiso') !== -1;

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

});
