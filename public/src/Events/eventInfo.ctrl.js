var app = angular.module('js');

app.controller('EventInfoCtrl', function($scope, $routeParams, $sce, EventsSvc, $rootScope, $translate) {
	$scope.busyPromise = EventsSvc.findById($routeParams.eventId);

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

	EventsSvc.findById($routeParams.eventId).success(function(ev) {
		$scope.event = ev;
		$scope.info = $sce.trustAsHtml(ev.info);
		$scope.info_it = $sce.trustAsHtml(ev.info_it);
	});
});
