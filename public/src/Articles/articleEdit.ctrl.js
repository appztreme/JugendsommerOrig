var app = angular.module('js');

app.controller('ArticleEditCtrl', function($scope, $routeParams, ArticlesSvc, $location, NotificationSvc) {
    $scope.save = function() {
		if($scope.name) {
			ArticlesSvc.update({
                _id: $scope._id,
                code: $scope.code,
				name: $scope.name,
				description: $scope.description,
				location: $scope.location,
				type: $scope.type,
				maxLoanDuration: $scope.maxLoanDuration,
				isSet: $scope.isSet,
				isInSet: $scope.isInSet,
				articles: $scope.articles
			}).success(function(activity) {
                $scope._id = null;
                $scope.code = null;
				$scope.name = null;
				$scope.description = null;
				$scope.location = null;
				$scope.type = null;
				$scope.maxLoanDuration = 0;
				$scope.isSet = false;
				$scope.isInSet = false;
				$scope.articles = [];
			}).then(function() {
				NotificationSvc.notify('Artikel erfolgreich geändert');
				$location.path('/shop/articles/');
			});
		}
	};

	$scope.addToArticles = function(selectedArticle) {
		selectedArticle.isInSet = true;
		selectedArticle.status = 'blocked';
		$scope.articles.push($scope.selectedArticle);
	}

	$scope.removeFromArticles = function(article) {
		var index = $scope.articles.indexOf(article);
		console.log("remove", article, index);
		if(index >= 0) $scope.articles.splice(index, 1);
	}

    ArticlesSvc.findById($routeParams.articleId).success(function(article) {
        $scope._id = article._id;
		$scope.code = article.code;
		$scope.name = article.name;
		$scope.description = article.description;
		$scope.location = article.location;
		$scope.type = article.type;
		$scope.maxLoanDuration = article.maxLoanDuration;
		$scope.isSet = article.isSet;
		$scope.isInSet = article.isInSet;
		$scope.articles = article.articles;
		console.log("a", article);
	});

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