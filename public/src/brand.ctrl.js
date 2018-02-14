var app = angular.module('js');

app.controller('BrandCtrl', function($scope, PlatformSvc) {
    $scope.platformSvc = PlatformSvc;
    // console.log(PlatformSvc, "Platform Service");
});