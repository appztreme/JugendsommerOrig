var app = angular.module('js');

app.controller('GeoSelectionCtrl', function($scope, $location, GeoSvc) {
    $scope.busyPromise = GeoSvc.getSelection();
    var host = $location.$$host.toLowerCase();

    const addNameProp = function (ar) {
        for(var i = 0; i < ar.length; i++) {
            if(ar[i]._id === 'club') ar[i].name = "Jugendtreff";
            else ar[i].name = ar[i]._id;
        }
    }

    if(host.indexOf("jugendsommer") !== -1) {
        GeoSvc.getSummerSelection().success(function(sel) {
            addNameProp(sel);
            $scope.locations = sel;
        });
    }
    else if(host.indexOf("jd-bozenland") !== -1) {
        GeoSvc.getTypeSelection().success(function(sel) {
            addNameProp(sel);
            $scope.locations = sel;
        });
    }
    else {
        GeoSvc.getSelection().success(function(sel) {
            console.log("res", sel);
            addNameProp(sel);
            $scope.locations = sel;
        });
    }
});
