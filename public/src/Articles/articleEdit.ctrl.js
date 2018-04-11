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
			}).success(function(activity) {
                $scope._id = null;
                $scope.code = null;
				$scope.name = null;
				$scope.description = null;
				$scope.location = null;
				$scope.type = null;
				$scope.maxLoanDuration = 0;
			}).then(function() {
				NotificationSvc.notify('Artikel erfolgreich geändert');
				$location.path('/shop/articles/');
			});
		}
	};

    ArticlesSvc.findById($routeParams.articleId).success(function(article) {
        $scope._id = article._id;
		$scope.code = article.code;
		$scope.name = article.name;
		$scope.description = article.description;
		$scope.location = article.location;
		$scope.type = article.type;
		$scope.maxLoanDuration = article.maxLoanDuration;
	});
})