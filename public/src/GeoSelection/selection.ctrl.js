var app = angular.module('js');

app.controller('GeoSelectionCtrl', function($scope, $location, GeoSvc) {
    $scope.title = 'Wo wir tätig sind';

    $scope.busyPromise = GeoSvc.getSelection();

    GeoSvc.getSelection().success(function(sel) {
        $scope.locations = sel;
    });
});
