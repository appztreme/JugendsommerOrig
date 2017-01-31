var app = angular.module('js');

app.controller('GeoSelectionCtrl', function($scope, $location, GeoSvc) {
    $scope.title = 'Wo wir tätig sind';

    $scope.busyPromise = GeoSvc.getSelection();
    var host = $location.$$host.toLowerCase();
    if(host.indexOf("jugendsommer") !== -1) {
        GeoSvc.getSummerSelection().success(function(sel) {
            // sel.forEach(s => { if(s._id === 'club') { s._id = "Jugendtreff" }})
            $scope.locations = sel;
        });
    }
    else if(host.indexOf("jd-bozenland") !== -1) {
        GeoSvc.getTypeSelection().success(function(sel) {
            $scope.locations = sel;
        });
    }
    else {
        GeoSvc.getTypeSelection().success(function(sel) {
            // console.log("xxx", sel)
            // sel.forEach(s => { if(s._id === 'club') { s._id = "Jugendtreff" }});
            $scope.locations = sel;
        });
    }
});
