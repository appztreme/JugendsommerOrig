var app = angular.module('js');

app.controller('CommitmentEditCtrl', function($scope, $routeParams, $location, IdentitySvc, NotificationSvc, CommitmentSvc) {
	$scope.title = 'Rechnung editieren';

	$scope.save = function() {
		if($scope.name && $scope.amount && $scope.date) {
			CommitmentSvc.update({
				_id: $scope._id,
				name: $scope.name,
				type: $scope.type,
				description: $scope.description,
				rnumber: $scope.rnumber,
				date: $scope.date,
				amount: $scope.amount,
				userId: $scope.userId,
				eventId: $scope.eventId,
				activityId: $scope.activityId,
				isPaymentDone: $scope.isPaymentDone,
				isPaymentJDDone: $scope.isPaymentJDDone,
				isInvoice: $scope.isInvoice,
				isCleared: $scope.isCleared
			}).success(function(commitment) {
				$scope.name = null;
				$scope.description = null;
				$scope.rnumber = null;
				$scope.date = null;
				$scope.type = null;
				$scope.amount = 0;
				$scope.isPaymentDone = false;
				$scope.isPaymentJDDone = false;
				$scope.isInvoice = false;
				$scope.isCleared = false;
			}).then(function() {
				NotificationSvc.notify('Rechnung erfolgreich editiert');
				$location.path('/myCommitments');
			});
		}
	};

	CommitmentSvc.findById($routeParams.commitmentId).success(function(com) {
		$scope._id = com._id;
		$scope.name = com.name;
		$scope.description = com.description;
		$scope.rnumber = com.rnumber;
		$scope.type = com.type;
		$scope.amount = com.amount;
		$scope.eventId = com.eventId;
		$scope.activityId = com.activityId;
		$scope.userId = com.userId;
		$scope.date = new Date(com.date);
		$scope.isPaymentDone = com.isPaymentDone;
		$scope.isPaymentJDDone = com.isPaymentJDDone;
		$scope.isInvoice = com.isInvoice;
		$scope.isCleared = com.isCleared;

		CommitmentSvc.getActivities(com.eventId)
			.success(function(activities) {
				$scope.activities = activities;
			});
	});
});
