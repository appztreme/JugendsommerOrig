var app = angular.module('js');

app.controller('PaymentCtrl', function($scope, IdentitySvc, PaymentSvc) {
	$scope.title = 'Auszahlung';

	$scope.relations = [];

	$scope.getReportData = function() {
		PaymentSvc.find()
			.success(function(result) {
				$scope.relations = result;
				console.log("result", result);
				// $scope.emails = _.uniq(_.map($scope.payments, function(r) {
                // 		return r.email;
            	// 	})).join(';');
			});
	}
});