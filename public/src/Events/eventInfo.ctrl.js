var app = angular.module('js');

app.controller('EventInfoCtrl', function($scope, $routeParams, EventsSvc, $rootScope, $translate) {
	$scope.busyPromise = EventsSvc.findById($routeParams.eventId);

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

	EventsSvc.findById($routeParams.eventId).success(function(ev) {
		$scope.event = ev;
		$scope.info = ev.info;
	});
});
