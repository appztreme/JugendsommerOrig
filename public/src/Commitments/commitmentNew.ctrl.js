var app = angular.module('js');

app.controller('CommitmentNewCtrl', function($scope, $routeParams, $location, NotificationSvc, IdentitySvc, CommitmentSvc) {
	$scope.title = 'Rechnung hinzufügen';
	//Default values
	$scope.amount = 1.1;
	$scope.isPaymentDone = false;
	$scope.isPaymentJDDone = false;
	$scope.isInvoice = false;

	$scope.save = function() {
		if($scope.name && $scope.amount && $scope.date) {
			CommitmentSvc.create({
				name: $scope.name,
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
				$scope.amount = 0;
				$scope.isPaymentDone = false;
				$scope.isPaymentJDDone = false;
				$scope.isInvoice = false;
			}).then(function() {
				NotificationSvc.notify('Rechnung erfolgreich erstellt');
				$location.path('/');
			});
		}
	};


});
