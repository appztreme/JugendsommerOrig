var app = angular.module('js');

app.controller('GeoSelectionCtrl', function($scope, $location, GeoSvc, $rootScope, $translate, IdentitySvc) {
    $scope.busyPromise = GeoSvc.getSelection();
    var host = $location.$$host.toLowerCase();

    $scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

    $scope.isKiso = host.indexOf('kiso.bz.it') !== -1;

    const addNameProp = function (ar) {
        for(var i = 0; i < ar.length; i++) {
            if(ar[i].name === 'club') {
                ar[i].name = "Jugendtreff";
                ar[i].name_id = "Jugendtreff";
            }
        }
    }

    if(host.indexOf("jugendsommer") !== -1) {
        if(IdentitySvc.isAdmin()) {
            GeoSvc.getSummerSelectionAdmin().success(function(sel) {
                addNameProp(sel);
                $scope.locations = sel;
            });
        } else {
            GeoSvc.getSummerSelection().success(function(sel) {
                addNameProp(sel);
                $scope.locations = sel;
            });
        }
    }
    else if(host.indexOf("jd-bozenland") !== -1) {
        if(IdentitySvc.isAdmin()) {
            GeoSvc.getTypeSelectionAdmin().success(function(sel) {
                addNameProp(sel);
                $scope.locations = sel;
            });
        } else {
            GeoSvc.getTypeSelection().success(function(sel) {
                addNameProp(sel);
                $scope.locations = sel;
            });
        }
    }
    else {
        if(IdentitySvc.isAdmin()) {
            GeoSvc.getSelectionAdmin().success(function(sel) {
                addNameProp(sel);
                $scope.locations = sel;
            });
        } else {
            GeoSvc.getSelection().success(function(sel) {
                addNameProp(sel);
                $scope.locations = sel;
            }).error(function(err) { console.log("err", err)});
        }
    }
});
