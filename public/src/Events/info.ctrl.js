var app = angular.module('js');

app.controller('InfoCtrl', function($scope, $rootScope, $translate, $location) {
    var host = $location.$$host.toLowerCase();
    $scope.isKiso = true; //host.indexOf('kiso') !== -1;

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });
});
