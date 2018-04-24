app.controller('ShopCalendarCtrl', function($scope, $routeParams, IdentitySvc, LoansSvc, ArticlesSvc, $location, NotificationSvc) {
    $scope.iSvc = IdentitySvc;

    $scope.from = new Date();
    $scope.to = new Date();
    $scope.articleId = undefined;
    $scope.location = undefined;
    $scope.lender = undefined;

    $scope.find = function(from, to, articleId, location, lender) {
        LoansSvc.findByDateRange(from, to, articleId, location, lender).then(function(response) {
            NotificationSvc.notify('Daten geladen');
            $scope.loans = response.data;
            console.log(response);
        });
    }

    $scope.delete = function(loanId) {
        if(IdentitySvc.isAdmin() || IdentitySvc.isFadmin()) {
            LoansSvc.delete(loanId).then(function(response) {
                NotificationSvc.notify('Ausleihe gelöscht');
                $location.path('/');
            })
        }

    }

    //$scope.find(new Date("2018-04-01"), new Date("2018-04-26"))
})
