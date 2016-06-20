var app = angular.module('js');

app.controller('ResourcesCtrl', function($scope, $location, $route, NotificationSvc, IdentitySvc, LendingSvc) {
	$scope.title = 'Materialübersicht';
	$scope.busyPromise = LendingSvc.findByDate();

	$scope.onlyMy = false;

	$scope.search = function() {
		if($scope.onlyMy) {
			LendingSvc.findByDateAndUser($scope.date, IdentitySvc.currentUser._id)
				.success(function(lends) {
					$scope.lendings = lends;
				});
		} else {
			LendingSvc.findByDate($scope.date)
				.success(function(lends) {
					$scope.lendings = lends;
				});
		}
	};
});
