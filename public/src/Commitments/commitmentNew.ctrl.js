var app = angular.module('js');

app.controller('CommitmentNewCtrl', function($scope, $location, NotificationSvc, CommitmentSvc) {
	$scope.title = 'Rechnung hinzufügen';

	$scope.save = function() {
		// if($scope.name) {
		// 	ActivitiesSvc.create({
		// 		name: $scope.name,
		// 		description: $scope.description,
		// 		startDate: $scope.startDate,
		// 		endDate: $scope.endDate,
		// 		maxParticipants: $scope.maxParticipants,
		// 		queueSize: $scope.queueSize,
		// 		eventId: ActivitiesSvc.eventId
		// 	}).success(function(activity) {
		// 		$scope.name = null;
		// 		$scope.description = null;
		// 		$scope.startDate = null;
		// 		$scope.endDate = null;
		// 		$scope.maxParticipants = 0;
		// 		$scope.queueSize = 0;
		// 	}).then(function() {
		// 		NotificationSvc.notify('Detail erfolgreich erstellt');
		// 		$location.path('/activities/' + ActivitiesSvc.eventId);
		// 	});
		// }
	};


});
