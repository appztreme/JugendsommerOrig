var app = angular.module('js');

app.controller('ArticleNewCtrl', function($scope, $location, ArticlesSvc, NotificationSvc) {
    $scope.title = 'Artikel hinzufügen';

	$scope.save = function() {
		if($scope.name) {
			ArticlesSvc.create({
				name: $scope.name,
				description: $scope.description,
				location: $scope.location,
				type: $scope.type,
				maxLoanDuration: $scope.maxLoanDuration,
			}).success(function(activity) {
				$scope.name = null;
				$scope.description = null;
				$scope.location = null;
				$scope.type = null;
				$scope.maxLoanDuration = 0;
			}).then(function() {
				NotificationSvc.notify('Artikel erfolgreich erstellt');
				$location.path('/shop/articles/');
			});
		}
	};
})