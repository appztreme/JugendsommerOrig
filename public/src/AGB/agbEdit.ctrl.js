var app = angular.module('js');

app.controller('AgbEditCtrl', function($scope, $routeParams, $location, AgbsSvc, NotificationSvc, $rootScope, $translate, PlatformSvc) {
	$scope.eventId = $routeParams.eventId;
    $scope.type = $routeParams.type;
    $scope.platform = PlatformSvc;
	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });
    console.log($scope.platform.host, $scope.lang)
});
