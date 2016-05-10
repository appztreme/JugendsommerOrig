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
		return $scope.sumGrp(grpArray) > grpArray[0].eventId.budget;
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
				var key = com.eventId._id;
				acc[key] = acc[key] || [];
				acc[key].push(com);
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
				var key = com.eventId._id;
			 acc[key] = acc[key] || [];
		   acc[key].push(com);
			 return acc;
			}, {});
		});
	}
});
