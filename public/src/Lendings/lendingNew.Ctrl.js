var app = angular.module('js');

app.controller('LendingNewCtrl', function($scope, $routeParams, $route, $templateCache, NotificationSvc, IdentitySvc, LendingSvc) {
	$scope.title = 'Material reservieren';

  $scope.busyPromise = LendingSvc.findByUser(IdentitySvc.currentUser._id);

	$scope.save = function() {
		if($scope.type && $scope.date) {
			LendingSvc.create({
				type: $scope.type,
				date: $scope.date,
				userId: IdentitySvc.currentUser._id,
				eventId: $routeParams.eventId
			}).success(function(lending) {
				$scope.date = undefined;
				$scope.type = null;
				NotificationSvc.notify('Reservierung erfolgreich erstellt');
        var currentPageTemplate = $route.current.templateUrl;
        $templateCache.remove(currentPageTemplate);
        $route.reload();
			}).error(function(data, status) {
        NotificationSvc.warn(data.message);
      });
		}
	};

  LendingSvc.getTypes()
    .success(function(types) {
      $scope.types = types;
    });

  LendingSvc.findByUser(IdentitySvc.currentUser._id)
    .success(function(lends) {
      $scope.myLendings = lends.sort();
      //console.log(lends);
    });

});
