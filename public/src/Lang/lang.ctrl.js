var app = angular.module('js');

app.controller('LangCtrl', function($scope, $translate) {

    $scope.curLang = 'de';

    $scope.setLang = function(code) { $scope.curLang = code; $translate.use(code); }
});
