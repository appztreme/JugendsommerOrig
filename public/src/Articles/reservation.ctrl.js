app.controller('ShopReservationCtrl', function($scope, $routeParams, IdentitySvc, ArticlesSvc, LoansSvc, $location, NotificationSvc, ReservationCacheSvc) {
    $scope.iSvc = IdentitySvc;
    $scope.currentState = 1;
    $scope.count = 1;
    $scope.responses = [];

    if($scope.iSvc.currentUser) {
        $scope.lender = $scope.iSvc.currentUser.firstName + ' ' + $scope.iSvc.currentUser.lastName;
        $scope.phoneNumber = $scope.iSvc.currentUser.userTel;
    }

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
        $scope.count = 1;
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
        $scope.responses = [];
        var counter = 0;
        var onSuccess = function(result) {
            var resp = "Artikel " + result.data.article.code +
                          " - " + result.data.article.name + 
                          " wurde von " + moment(result.data.from).format("ll") + " bis " +
                          moment(result.data.to).format("ll") + " erfolgreich reserviert";
            $scope.responses.push({hasError: false, response: resp });
        };
        var onError = function(err) {
            $scope.responses.push({hasError: true, response: err.data.split('<br>')[0]}); 
        };
        var updateCache = function() {
                ReservationCacheSvc.location = $scope.location;
                ReservationCacheSvc.lender = $scope.lender;
                ReservationCacheSvc.phoneNumber = $scope.phoneNumber;
                ReservationCacheSvc.from = $scope.from;
                ReservationCacheSvc.to = $scope.to;
        };
        var setRequestSent = function() {
            $scope.bookingRequestSent = true;
        };
        var reserveMore = function() {
            counter = counter + 1;
            //console.log("counter", counter);
            if(counter < $scope.count) {
                LoansSvc.create($scope.article, $scope.location, $scope.lender, $scope.phoneNumber, $scope.from, $scope.to, $scope.start, $scope.destination, $scope.startTime, $scope.endTime, $scope.participants)
                    .then(onSuccess, onError)
                    .then(updateCache)
                    .then(setRequestSent)
                    .then(reserveMore);
            }
        }
        LoansSvc.create($scope.article, $scope.location, $scope.lender, $scope.phoneNumber, $scope.from, $scope.to, $scope.start, $scope.destination, $scope.startTime, $scope.endTime, $scope.participants)
            .then(onSuccess, onError)
            .then(updateCache)
            .then(setRequestSent)
            .then(reserveMore); 
    }

    ArticlesSvc.overview().then(function(response) {
        $scope.overviews = response.data;
        $scope.bookingRequestSent = false;
        $scope.types = $scope.getTypes($scope.overviews);
        $scope.articles = $scope.getDistinctArticles($scope.overviews, $scope.type);
    });
    
    if(ReservationCacheSvc.hasData()) {
        $scope.location = ReservationCacheSvc.location;
        $scope.lender = ReservationCacheSvc.lender;
        $scope.phoneNumber = ReservationCacheSvc.phoneNumber;
        $scope.from = ReservationCacheSvc.from;
        $scope.to = ReservationCacheSvc.to;
    }
})