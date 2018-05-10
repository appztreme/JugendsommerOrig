app.controller('ShopCalendarCtrl', function($scope, $routeParams, IdentitySvc, LoansSvc, ArticlesSvc, $location, NotificationSvc) {
    $scope.iSvc = IdentitySvc;

    $scope.from = new Date();
    $scope.to = new Date();
    $scope.articleId = undefined;
    $scope.location = undefined;
    $scope.lender = undefined;
    $scope.loans = [];

    $scope.clearLocationSelection = function() {
        $scope.loans = [];
        $scope.location = undefined;
    }

    $scope.clearLenderSelection = function() {
        $scope.loans = [];
        $scope.lender = undefined;
    }

    $scope.clearArticleSelection = function() {
        $scope.loans = [];
        $scope.articleId = undefined;
        $scope.selectedArticle = undefined;
    }

    $scope.setArticleId = function(selectedArticle) {
        $scope.articleId = selectedArticle._id;
    }

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
                $location.path('/shop/calendar/');
            })
        }

    }

    ArticlesSvc.overview().then(function(response) {
		var articles = [];
		for(var i=0; i < response.data.length; i++) {
			var c = response.data[i].children;
			for(var j=0; j < c.length; j++) {
				if(!c[j].isInSet) articles.push(c[j]);
			}
		}
		$scope.allArticles = articles;
	});
})
