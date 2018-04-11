app.controller('ShopCalendarCtrl', function($scope, $routeParams, IdentitySvc, LoansSvc, ArticlesSvc, $location, NotificationSvc) {
    $scope.iSvc = IdentitySvc;

    $scope.from = undefined;
    $scope.to = new Date();

    $scope.find = function(from, to) {
        LoansSvc.findByDateRange(from, to).then(function(response) {
            NotificationSvc.notify('Daten geladen');
            $scope.loans = response.data;
            console.log(response);
        });
    }

    //$scope.find(new Date("2018-04-01"), new Date("2018-04-26"))
})