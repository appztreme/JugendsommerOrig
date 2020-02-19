var app = angular.module('js');

app.controller('InfoCtrl', function($scope, $rootScope, $translate, $location, PlatformSvc) {
    $scope.platform = PlatformSvc;
    
	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

    //console.log(PlatformSvc, PlatformSvc.isTest(), $scope.lang);

});
