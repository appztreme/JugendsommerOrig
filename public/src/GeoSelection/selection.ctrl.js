var app = angular.module('js');

app.controller('GeoSelectionCtrl', function($scope, $location, GeoSvc) {
    $scope.title = 'Wo wir tätig sind';

    $scope.busyPromise = GeoSvc.getSelection();
    var host = $location.$$host.toLowerCase();

    const addNameProp = function (ar) {
        for(var i = 0; i < ar.length; i++) {
            if(ar[i]._id === 'club') ar[i].name = "Jugendtreff";
            else ar[i].name = ar[i]._id;
        }
    }

    if(host.indexOf("jugendsommer") !== -1) {
        $scope.locations = [{_id: 'Deutschnofen', name: 'Deutschnofen', countEvents: 5, distinctTypes: ['summer']},
                         {_id: 'Hüttenlagerwoche', name: 'Hüttenlagerwoche', countEvents: 1, distinctTypes: ['summer']},
                         {_id: 'Jenesien', name: 'Jenesien', countEvents: 3, distinctTypes: ['summer']},
                         {_id: 'Karneid', name: 'Karneid', countEvents: 1, distinctTypes: ['summer']},
                         {_id: 'Mölten', name: 'Mölten', countEvents: 2, distinctTypes: ['summer']},
                         {_id: 'Ritten', name: 'Ritten', countEvents: 4, distinctTypes: ['summer']},
                         {_id: 'Sarntal', name: 'Sarntal', countEvents: 1, distinctTypes: ['summer']},
                         {_id: 'SpaceCamp', name: 'SpaceCamp', countEvents: 1, distinctTypes: ['summer']},
                         {_id: 'Tiers', name: 'Tiers', countEvents: 2, distinctTypes: ['summer']},
                         {_id: 'Tschögglberger Jungbläserwoche', name: 'Tschögglberger Jungbläserwoche', countEvents: 1, distinctTypes: ['music']},
                         {_id: 'Welschnofen', name: 'Welschnofen', countEvents: 2, distinctTypes: ['summer']}
                     ];
        // GeoSvc.getSummerSelection().success(function(sel) {
        //     addNameProp(sel);
        //     $scope.locations = sel;
        // });
    }
    else if(host.indexOf("jd-bozenland") !== -1) {
        GeoSvc.getTypeSelection().success(function(sel) {
            addNameProp(sel);
            $scope.locations = sel;
        });
    }
    else {
        // GeoSvc.getTypeSelection().success(function(sel) {
        //     addNameProp(sel);
        //     $scope.locations = sel;
        // });
        GeoSvc.getSelection().success(function(sel) {
            console.log("res", sel);
            addNameProp(sel);
            $scope.locations = sel;
        });
    }
});
