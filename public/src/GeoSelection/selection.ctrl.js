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

    const selStatic = [
        { countEvents: 2, distinctTypes: ["summer"], name: "Besondere Projekte", name_it: "Besondere Projekte", _id: "Besondere Projekte" },
        { countEvents: 5, distinctTypes: ["summer"], name: "Deutschnofen", name_it: "Nova Ponente", _id: "Deutschnofen" },
        { countEvents: 3, distinctTypes: ["summer"], name: "Jenesien", name_it: "San Genesio", _id: "Jenesien" },
        { countEvents: 4, distinctTypes: ["summer"], name: "Karneid", name_it: "Cornedo", _id: "Karneid" },
        { countEvents: 3, distinctTypes: ["summer"], name: "Kastelruth", name_it: "Castelrotto", _id: "Kastelruth" },
        { countEvents: 2, distinctTypes: ["summer"], name: "Mölten", name_it: "Meltina", _id: "Mölten" },
        { countEvents: 5, distinctTypes: ["summer"], name: "Ritten", name_it: "Renon", _id: "Ritten" },
        { countEvents: 4, distinctTypes: ["summer"], name: "Sarntal", name_it: "Val Sarentino", _id: "Sarntal" },
        { countEvents: 2, distinctTypes: ["summer"], name: "Tiers", name_it: "Tires", _id: "Tiers" },
        { countEvents: 2, distinctTypes: ["summer"], name: "Völs", name_it: "Fiè allo Sciliar", _id: "Völs" },
        { countEvents: 2, distinctTypes: ["summer"], name: "Vöran", name_it: "Verano", _id: "Vöran" },
        { countEvents: 3, distinctTypes: ["summer"], name: "Welschnofen", name_it: "Nova Levante", _id: "Welschnofen" }
    ]

    if($scope.platform.isJugendsommer()) {
        if(IdentitySvc.isAdmin()) {
            $scope.locations = selStatic;
            // GeoSvc.getSummerSelectionAdmin().success(function(sel) {
            //     addNameProp(sel);
            //     $scope.locations = sel;
            // });
        } else {
            $scope.locations = selStatic;
            // GeoSvc.getSummerSelection().success(function(sel) {
            //     addNameProp(sel);
            //     $scope.locations = sel;
            // });
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
