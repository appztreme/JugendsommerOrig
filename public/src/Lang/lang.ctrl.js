var app = angular.module('js');

app.controller('LangCtrl', function($scope, $translate, PlatformSvc) {
    $scope.platform = PlatformSvc;
    $scope.curLang = 'de';

    $scope.setLang = function(code) { $scope.curLang = code; $translate.use(code); }
});
