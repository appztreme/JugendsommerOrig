app.controller('ShopReservationCtrl', function($scope, $routeParams, IdentitySvc, ArticlesSvc, LoansSvc, $location, NotificationSvc, ReservationCacheSvc) {
    $scope.iSvc = IdentitySvc;
    $scope.currentState = 1;
    $scope.count = 1;
    $scope.responses = []; 

    if($scope.iSvc.currentUser) {
        $scope.lender = $scope.iSvc.currentUser.firstName + ' ' + $scope.iSvc.currentUser.lastName;
        $scope.phoneNumber = $scope.iSvc.currentUser.userTel;
        $scope.location = "-";
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

    $scope.getAllSelArticles = function(articles) {
        var result = "";
        for(var i=0; i < articles.length; i++) {
            result = result + ", " + articles[i].name;
        }
        return result;
    }

    $scope.IsSecondTabComplete = function() {
        if($scope.outputOverviews) {
            $scope.selectedArticles = $scope.getAllSelArticles($scope.outputOverviews);
            return $scope.outputOverviews.length > 0;
        }
        
        return false;
        //return $scope.outputOverviews.length > 0;
    }

    $scope.isRegistrationAllowed = function() {
        return $scope.IsFirstTabComplete() && $scope.IsSecondTabComplete();
    }

    $scope.updateType = function() {
        $scope.articles = $scope.getDistinctArticles($scope.overviews, $scope.type);
        $scope.count = 1;
    }

    // $scope.getTypes = function(overviews) {
    //     var result = [];
    //     if(overviews) {
    //         for(var i=0; i<overviews.length; i++) {
    //             result.push(overviews[i]._id);
    //         }
    //     }
    //     return result;
    // }

    $scope.addMultiSelectProps = function(overviews) {
        var curType = undefined;
        var lastType = undefined;
        var result = [];
        if(overviews) {
            for(var i=0; i<overviews.length; i++) {
                var overv = overviews[i];
                curType = overv.type;
                if(curType !== lastType) {
                    if(lastType) {
                        result.push({ msGroup: false })
                    }
                    result.push({ name: overv.type, msGroup: true });
                    
                }
                overv.ticked = false;
                overv.icon = '<span class="glyphicon glyphicon-th-large"  />';
                overv.disabled = $scope.isDisabledArticle(overv);
                if(!overv.isDisabledArticle) { result.push(overv); }
                lastType = overv.type;
            }
        }
        result.push({ msGroup: false });
        return result;
    }

    $scope.isDisabledArticle = function(article) {
        for(var i=0; i < article.loans.length; i++) {
            var l = article.loans[i];
            if((l.from >= $scope.from && l.from <= $scope.to) ||
               (l.to >= $scope.to && l.to <= $scope.to)) return true;
        }
        return false;
    }

    // $scope.getDistinctArticles = function(overviews, type) {
    //     var result = [];
    //     if(overviews) {
    //         for(var i=0; i<overviews.length; i++) {
    //             if(overviews[i]._id === type) {
    //                 for(var j=0; j<overviews[i].children.length; j++) {
    //                     if(result.indexOf(overviews[i].children[j].name) === -1 &&
    //                        overviews[i].children[j].status !== 'blocked'
    //                       ) {
    //                         result.push(overviews[i].children[j].name);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return result;
    // }

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
        // var reserveMore = function() {
        //     counter = counter + 1;
        //     //console.log("counter", counter);
        //     if(counter < $scope.count) {
        //         LoansSvc.create($scope.article, $scope.location, $scope.lender, $scope.phoneNumber, $scope.from, $scope.to, $scope.start, $scope.destination, $scope.startTime, $scope.endTime, $scope.participants)
        //             .then(onSuccess, onError)
        //             .then(updateCache)
        //             .then(setRequestSent)
        //             .then(reserveMore);
        //     }
        // }
        if($scope.outputOverviews) {
            for(var i=0; i < $scope.outputOverviews.length; i++) {
                var a = $scope.outputOverviews[i];
                LoansSvc.createById(
                    a._id,
                    $scope.lender,
                    $scope.phoneNumber,
                    $scope.from,
                    $scope.to,
                    a.maxLoanDuration
                )
                .then(onSuccess, onError)
                .then(updateCache)
                .then(setRequestSent)
            }
        }

        // LoansSvc.create($scope.article, $scope.location, $scope.lender, $scope.phoneNumber, $scope.from, $scope.to, $scope.start, $scope.destination, $scope.startTime, $scope.endTime, $scope.participants)
        //     .then(onSuccess, onError)
        //     .then(updateCache)
        //     .then(setRequestSent)
        //     .then(reserveMore); 
    }

    ArticlesSvc.find().then(function(response) {
        //console.log(response.data);
        $scope.overviews = $scope.addMultiSelectProps(response.data);
        $scope.bookingRequestSent = false;
        console.log($scope.overviews);
        // $scope.types = $scope.getTypes($scope.overviews);
        // $scope.articles = $scope.getDistinctArticles($scope.overviews, $scope.type);
    });
    
    if(ReservationCacheSvc.hasData()) {
        $scope.location = ReservationCacheSvc.location;
        $scope.lender = ReservationCacheSvc.lender;
        $scope.phoneNumber = ReservationCacheSvc.phoneNumber;
        $scope.from = ReservationCacheSvc.from;
        $scope.to = ReservationCacheSvc.to;
    }
})