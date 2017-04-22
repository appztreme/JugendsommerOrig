var app = angular.module('js');

app.controller('PaymentCtrl', function($scope, IdentitySvc, PaymentSvc) {
	$scope.title = 'Auszahlung';

	$scope.getReportData = function() {
		PaymentSvc.find()
			.success(function(result) {
				// this.scope.payments = result;
				console.log("result", result);
				// $scope.emails = _.uniq(_.map($scope.payments, function(r) {
                // 		return r.email;
            	// 	})).join(';');
			});
	}
});