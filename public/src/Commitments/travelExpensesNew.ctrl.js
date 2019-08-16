var app = angular.module('js');

app.controller('TravelExpensesNewCtrl', function($scope, $routeParams, $location, NotificationSvc, IdentitySvc, CommitmentSvc) {
	$scope.title = 'Fahrtkostenabrechnung';
	//Default values
  	$scope.kilometers = 0;
  	$scope.subsidyRate = 0.25;
	$scope.amount = 0;
  	$scope.type = 'travel';
	$scope.isPaymentDone = false;
	$scope.isPaymentJDDone = false;
	$scope.isInvoice = false;
	$scope.isCleared = false;

  $scope.onKilometeresChanged = function() {
    $scope.amount = Math.round($scope.kilometers * $scope.subsidyRate * 100) / 100;
  }

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
				isInvoice: $scope.isInvoice,
				isCleared: $scope.isCleared,
			}).success(function(commitment) {
				$scope.name = null;
				$scope.description = null;
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
