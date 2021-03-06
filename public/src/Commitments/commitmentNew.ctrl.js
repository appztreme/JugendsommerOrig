var app = angular.module('js');

app.controller('CommitmentNewCtrl', function($scope, $routeParams, $location, NotificationSvc, IdentitySvc, CommitmentSvc) {
	$scope.title = 'Rechnung hinzufügen';
	//Default values
	$scope.amount = 1.1;
	$scope.type = 'business';
	$scope.isPaymentDone = false;
	$scope.isPaymentJDDone = false;
	$scope.isInvoice = false;
	$scope.isCleared = false;
	$scope.activityId = null;

	CommitmentSvc.getActivities($routeParams.eventId)
		.success(function(activities) {
			$scope.activities = activities;
		});

	$scope.save = function() {
		if($scope.name && $scope.amount && $scope.date) {
			CommitmentSvc.create({
				name: $scope.name,
				type: $scope.type,
				description: $scope.description,
				rnumber: $scope.rnumber,
				date: $scope.date,
				amount: $scope.amount,
				userId: IdentitySvc.currentUser._id,
				eventId: $routeParams.eventId,
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
				NotificationSvc.notify('Rechnung erfolgreich erstellt');
				$location.path('/');
			});
		}
	};


});
