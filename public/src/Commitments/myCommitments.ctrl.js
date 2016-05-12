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

	$scope.calcBudgetSum = function(grp) {
		var sum = 0;
		if(grp['business'])
			sum += grp['business'][0].eventId.budgetBusiness;
		if(grp['food'])
			sum += grp['food'][0].eventId.budgetFood;
		return sum;
	};

	$scope.toggleVisibility = function(grpArray) {
		_.forEach(grpArray, function(value) { value['isHidden'] = !value['isHidden']});
	};

	$scope.isOverBudget = function(grpArray, type) {
		if (type === 'business')
				return $scope.sumGrpAll(grpArray) > grpArray[0].eventId.budgetBusiness;
		if (type === 'food')
				return $scope.sumGrpAll(grpArray) > grpArray[0].eventId.budgetFood;
	};

	$scope.sumGrp = function(ar, reducer) {
		return Math.round(_.reduce(ar, reducer, 0) * 100) / 100;
	};

	$scope.sumGrpAll = function(ar) {
		return $scope.sumGrp(ar, function(acc, item) { return acc + item.amount; });
	};

	$scope.sumGrpTypes = function(grp) {
		return Math.round(($scope.sumGrpAll(grp["food"]) +
		                   $scope.sumGrpAll(grp["business"]))*100)/100;
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

	$scope.getEventName = function(grp) {
		if(grp.hasOwnProperty('business'))
			return grp['business'][0].eventId.location + ' - ' + grp['business'][0].eventId.name;
		else if (grp.hasOwnProperty('food'))
			return grp['food'][0].eventId.location + ' - ' + grp['food'][0].eventId.name;

		return "";
	}

	if(IdentitySvc.isFAdmin() && !IdentitySvc.isAdmin()) {
		CommitmentSvc.findByUser(IdentitySvc.currentUser._id).success(function(commitments) {
			$scope.sum = Math.round(_.reduce(commitments, function(sum, object) {
				return sum + object.amount;
			}, 0) * 100) / 100;

			$scope.commitments = _.reduce(commitments, function(acc, com) {
				var key1 = com.eventId._id;
				var key2 = com.type;
				acc[key1] = acc[key1] || {};
			 	acc[key1][key2] = acc[key1][key2] || [];
				com['isHidden'] = true;
				acc[key1][key2].push(com);
			 	return acc;
			}, {});
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
				acc[key1] = acc[key1] || {};
			 	acc[key1][key2] = acc[key1][key2] || [];
				com['isHidden'] = true;
				acc[key][key2].push(com);
			 	return acc;
			}, {});
		});
	}
});
