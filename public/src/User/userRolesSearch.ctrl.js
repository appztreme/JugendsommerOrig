var app = angular.module('js');

app.controller('UserRolesSearchCtrl', function($scope, $location, UserSvc) {

	$scope.search = function() {
		//console.log("search");
		UserSvc.search($scope.searchTerm)
			.success(function(result) {
				$scope.searchResult = result;
			})
	}

});
