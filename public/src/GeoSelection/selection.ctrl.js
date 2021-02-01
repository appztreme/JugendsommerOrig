var app = angular.module('js');

app.controller('GeoSelectionCtrl', function($scope, $location, GeoSvc, $rootScope, $translate, IdentitySvc, PlatformSvc) {
    $scope.busyPromise = GeoSvc.getSelection();
    $scope.platform = PlatformSvc;
    $scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

    $scope.encodeFullURI = function(str) {
		var encoded = str.replace('/', '%2F');
		return encodeURI(encoded);
	}

    const addNameProp = function (ar) {
        for(var i = 0; i < ar.length; i++) {
            if(ar[i].name === 'club') {
                ar[i].name = "Jugendtreff";
                ar[i].name_id = "Jugendtreff";
            }
        }
    }

    if($scope.platform.isJugendsommer()) {
        if(IdentitySvc.isAdmin()) {
            GeoSvc.getSummerSelectionAdmin().success(function(sel) {
                addNameProp(sel);
                console.log(sel);
                $scope.locations = sel;
            });
        } else {
            GeoSvc.getSummerSelection().success(function(sel) {
                addNameProp(sel);
                console.log(sel);
                $scope.locations = sel;
            });
        }
    }
    else if($scope.platform.isJDBL()) {
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
