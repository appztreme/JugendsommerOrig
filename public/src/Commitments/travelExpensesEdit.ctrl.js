var app = angular.module('js');

app.controller('TravelExpensesEditCtrl', function($scope, $routeParams, $location, IdentitySvc, NotificationSvc, CommitmentSvc) {
	$scope.title = 'fahrkostenabrechnung';

  $scope.subsidyRate = 0.25;

  $scope.onKilometeresChanged = function() {
    $scope.amount = $scope.kilometers * $scope.subsidyRate;
  }

	$scope.save = function() {
		if($scope.name && $scope.amount && $scope.date) {
			CommitmentSvc.update({
				_id: $scope._id,
				name: $scope.name,
				type: $scope.type,
				description: $scope.description,
				date: $scope.date,
				amount: $scope.amount,
				userId: IdentitySvc.currentUser._id,
				eventId: $scope.eventId,
				isPaymentDone: $scope.isPaymentDone,
				isPaymentJDDone: $scope.isPaymentJDDone,
				isInvoice: $scope.isInvoice,
				isCleared: $scope.isCleared,
			}).success(function(commitment) {
				$scope.name = null;
				$scope.description = null;
				$scope.date = null;
				$scope.type = null;
				$scope.amount = 0;
        $scope.kilometers = 0;
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
		$scope.type = com.type;
		$scope.amount = com.amount;
		$scope.eventId = com.eventId;
		$scope.userId = com.userId;
		$scope.date = new Date(com.date);
		$scope.isPaymentDone = com.isPaymentDone;
		$scope.isPaymentJDDone = com.isPaymentJDDone;
		$scope.isInvoice = com.isInvoice;
		$scope.isCleared = com.isCleared;
    $scope.kilometers = $scope.amount / $scope.subsidyRate;
	});
});
