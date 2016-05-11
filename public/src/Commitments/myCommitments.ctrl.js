var app = angular.module('js');

app.controller('MyCommitmentsCtrl', function($scope, $location, $route, CommitmentSvc, IdentitySvc) {
	$scope.busyPromise = CommitmentSvc.findByUser(IdentitySvc.currentUser._id);

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	$scope.editCommitment = function(id) {
		$location.path('editCommitment/' + id);
	};

	$scope.deleteCommitment = function(id) {
		CommitmentSvc.delete(id).then(function(err, com) {
			$route.reload();
		});
	};

	$scope.isOverBudget = function(grpArray) {
		return $scope.sumGrp(grpArray) > grpArray[0].eventId.budgetBusiness;
	};

	$scope.sumGrp = function(ar, reducer) {
		return Math.round(_.reduce(ar, reducer, 0) * 100) / 100;
	};

	$scope.sumGrpAll = function(ar) {
		return $scope.sumGrp(ar, function(acc, item) { return acc + item.amount; });
	};

	$scope.sumGrpIsPaymentDone = function(ar) {
		return $scope.sumGrp(ar, function(acc, item) { return (item.isPaymentDone) ? acc + item.amount : acc; });
	};

	$scope.sumGrpIsPaymentJDDone = function(ar) {
		return $scope.sumGrp(ar, function(acc, item) { return (item.isPaymentJDDone) ? acc + item.amount : acc; });
	};

	$scope.sumGrpIsInvoice = function(ar) {
		return $scope.sumGrp(ar, function(acc, item) { return (item.isInvoice) ? acc + item.amount : acc; });
	};

	if(IdentitySvc.isFAdmin() && !IdentitySvc.isAdmin()) {
		CommitmentSvc.findByUser(IdentitySvc.currentUser._id).success(function(commitments) {
			$scope.sum = Math.round(_.reduce(commitments, function(sum, object) {
				return sum + object.amount;
			}, 0) * 100) / 100;

			$scope.commitments = _.reduce(commitments, function(acc, com) {
				var key1 = com.eventId._id;
				var key2 = com.type;
				console.log('key1', key1);
				console.log('key2', key2);
				//acc[key1] = acc[key1] || [];
				acc[key1] = acc[key1] || {};
				console.log('first',acc);
			 	acc[key1][key2] = acc[key1][key2] || [{ 'business': [], 'food': []}];
				console.log('second', acc);
				acc[key1][key2].push(com);
		   	//acc[key1].push(com);
			 	return acc;
			}, {});
			console.log(commitments);
		});
	}
	if(IdentitySvc.isAdmin()) {
		CommitmentSvc.find().success(function(commitments) {
			$scope.sum = Math.round(_.reduce(commitments, function(sum, object) {
				return sum + object.amount;
			}, 0) * 100) / 100;

			$scope.commitments = _.reduce(commitments, function(acc, com) {
				var key1 = com.eventId._id;
				var key2 = com.type;
				console.log('key1', key1);
				console.log('key2', key2);
				//acc[key1] = acc[key1] || [];
				acc[key1] = acc[key1] || {};
				console.log('first',acc);
			 	acc[key1][key2] = acc[key1][key2] || [{ 'business': [], 'food': []}];
				console.log('second', acc);
				acc[key][key2].push(com);
		   	//acc[key1].push(com);
			 	return acc;
			}, {});
		});
	}
});
