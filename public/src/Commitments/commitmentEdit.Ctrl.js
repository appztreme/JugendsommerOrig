var app = angular.module('js');

app.controller('CommitmentEditCtrl', function($scope, $location, NotificationSvc, ActivitiesSvc) {
	$scope.title = 'Rechnung editieren';

	$scope.save = function() {
		if($scope.name && $scope.amount && $scope.date) {
			CommitmentSvc.create({
				name: $scope.name,
				type: $scope.type,
				description: $scope.description,
				date: $scope.date,
				amount: $scope.amount,
				userId: IdentitySvc.currentUser._id,
				eventId: $routeParams.eventId,
				isPaymentDone: $scope.isPaymentDone,
				isPaymentJDDone: $scope.isPaymentJDDone,
				isInvoice: $scope.isInvoice
			}).success(function(commitment) {
				$scope.name = null;
				$scope.description = null;
				$scope.date = null;
				$scope.type = null;
				$scope.amount = 0;
				$scope.isPaymentDone = false;
				$scope.isPaymentJDDone = false;
				$scope.isInvoice = false;
			}).then(function() {
				NotificationSvc.notify('Rechnung erfolgreich editiert');
				$location.path('/myCommitments');
			});
		}
	};

	CommitmentSvc.findById($routeParams.commitmentId).success(function(com) {
		$scope.name = com.name;
		$scope.description = com.description;
		$scope.type = com.type;
		$scope.amount = com.amount;
		$scope.date = new Date(com.date);
		$scope.isPaymentDone = com.isPaymentDone;
		$scope.isPaymentJDDone = com.isPaymentJDDone;
		$scope.isInvoice = isInvoice;
	});
});
