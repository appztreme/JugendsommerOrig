var app = angular.module('js');

app.controller('PaymentCtrl', function($scope, IdentitySvc, PaymentSvc) {
	$scope.title = 'Auszahlung';

	$scope.relations = [];

	$scope.clearNameSelection = function() {
		$scope.nameFilter = '';
		$scope.relations = [];
	}

	$scope.getReportData = function() {
		$scope.relations = [];
		PaymentSvc.find()
			.success(function(result) {
				if($scope.nameFilter) {
					for(var i = 0; i < result.length; i++) {
						if(result[i].lastName == $scope.nameFilter) {
							$scope.relations.push(result[i]);
						}
					}
				} else {
					$scope.relations = result;
				}		

				// console.log("result", result);
				// $scope.emails = _.uniq(_.map($scope.payments, function(r) {
                // 		return r.email;
            	// 	})).join(';');
			});
	}
});