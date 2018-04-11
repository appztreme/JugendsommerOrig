app.controller('ShopReservationCtrl', function($scope, $routeParams, IdentitySvc, ArticlesSvc, LoansSvc, $location, NotificationSvc) {
    $scope.iSvc = IdentitySvc;
    $scope.currentState = 1;

    $scope.setState = function(state) {
		$scope.currentState = state;
    }
    
    $scope.IsFirstTabComplete = function() {
        return $scope.location &&
               $scope.lender &&
               $scope.phoneNumber &&
               $scope.from &&
               $scope.to;
    }

    $scope.IsSecondTabComplete = function() {
        return $scope.article;
    }

    $scope.isRegistrationAllowed = function() {
        return $scope.IsFirstTabComplete() && $scope.IsSecondTabComplete();
    }

    $scope.updateType = function() {
        $scope.articles = $scope.getDistinctArticles($scope.overviews, $scope.type);
    }

    $scope.getTypes = function(overviews) {
        var result = [];
        if(overviews) {
            for(var i=0; i<overviews.length; i++) {
                result.push(overviews[i]._id);
            }
        }
        return result;
    }

    $scope.getDistinctArticles = function(overviews, type) {
        var result = [];
        if(overviews) {
            for(var i=0; i<overviews.length; i++) {
                if(overviews[i]._id === type) {
                    for(var j=0; j<overviews[i].children.length; j++) {
                        if(result.indexOf(overviews[i].children[j].name) === -1 &&
                           overviews[i].children[j].status !== 'blocked'
                          ) {
                            result.push(overviews[i].children[j].name);
                        }
                    }
                }
            }
        }
        return result;
    }

    $scope.save = function() {
        LoansSvc.create($scope.article, $scope.location, $scope.lender, $scope.phoneNumber, $scope.from, $scope.to)
            .error(function(err) {
                $scope.hasError = true;
                $scope.bookingRequestSent = true;
                $scope.response = err.split('<br>')[0];
            })
            .success(function(result) {
                $scope.hasError = false;
                $scope.bookingRequestSent = true;
                $scope.response = "Artikel " + result.article.code +
                                  " - " + result.article.name + 
                                  " wurde von " + moment(result.from).format("ll") + " bis " +
                                  moment(result.to).format("ll") + " erfolgreich reserviert";
            });
    }

    ArticlesSvc.overview().then(function(response) {
        $scope.overviews = response.data;
        $scope.bookingRequestSent = false;
        $scope.types = $scope.getTypes($scope.overviews);
        $scope.articles = $scope.getDistinctArticles($scope.overviews, $scope.type);
	});
})