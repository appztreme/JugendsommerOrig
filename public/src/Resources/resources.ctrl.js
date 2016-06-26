var app = angular.module('js');

app.controller('ResourcesCtrl', function($scope, $location, $route, NotificationSvc, IdentitySvc, LendingSvc) {
	$scope.title = 'Materialübersicht';
	$scope.busyPromise = LendingSvc.delete();

	$scope.onlyMy = false;
	$scope.all = false;

	$scope.delete = function(lendId) {
		LendingSvc.delete(lendId)
			.success(function(len) {
				NotificationSvc.notify("Erfolgreich gelöscht");
				$scope.lendings.splice($scope.lendings.indexOf(len), 1);
			})
			.error(function(err) {
				NotificationSvc.warn(err);
			});
	}

	$scope.search = function() {
		if($scope.all) {
			LendingSvc.find()
				.success(function(lends) {
					$scope.lendings = lends;
				});
		} else if($scope.onlyMy) {
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
