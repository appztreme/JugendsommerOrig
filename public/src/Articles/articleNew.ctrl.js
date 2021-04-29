var app = angular.module('js');

app.controller('ArticleNewCtrl', function($scope, $location, ArticlesSvc, NotificationSvc) {
	$scope.title = 'Artikel hinzufügen';
	$scope.articles = [];
	$scope.location = ' ';

	$scope.save = function() {
		if($scope.name) {
			ArticlesSvc.create({
				name: $scope.name,
				description: $scope.description,
				location: $scope.location,
				type: $scope.type,
				maxLoanDuration: $scope.maxLoanDuration,
				isSet: $scope.isSet,
				articles: $scope.articles
			}).success(function(activity) {
				$scope.name = null;
				$scope.description = null;
				$scope.location = null;
				$scope.type = null;
				$scope.maxLoanDuration = 0;
				$scope.isSet = false;
				$scope.articles = [];
			}).then(function() {
				NotificationSvc.notify('Artikel erfolgreich erstellt');
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