var app = angular.module('js');

app.controller('PaymentCtrl', function($scope, IdentitySvc, PaymentSvc) {
	$scope.title = 'Auszahlung';

	$scope.relations = [];

	$scope.sumAmount = 0;

	$scope.clearNameSelection = function() {
		$scope.nameFilter = '';
		$scope.relations = [];
		$scope.sumAmount = 0;
	}

	$scope.getReportData = function() {
		$scope.relations = [];
		$scope.sumAmount = 0;
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

				$scope.sumAmount = _.reduce($scope.relations, function(memo, r) {
					return memo + r.amount;
				}, 0);

				$scope.emailsLeader = _.trim(_.uniq(_.map($scope.relations, function(r) {
					if(r.type === 'TeamleiterIn' || r.type === 'TeamleiterIn 24h' || r.type === 'TeamleiterIn 0.5' || r.type === 'TeamleiterIn 24h 0.5') {
                		return r.email;
					} else return '';
            	})).join(';'), ';');
				$scope.emailsCaregiver = _.trim(_.uniq(_.map($scope.relations, function(r) {
					if(r.type === 'BetreuerIn' || r.type === 'BetreuerIn 24h') {
                		return r.email;
					} else return '';
            	})).join(';'), ';');
				$scope.emailsTrainee = _.trim(_.uniq(_.map($scope.relations, function(r) {
                	if(r.type === 'PraktikantIn' || r.type === 'PraktikantIn 24h') {
                		return r.email;
					} else return '';
            	})).join(';'), ';');
			});
	}
});