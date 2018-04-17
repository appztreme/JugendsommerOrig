var app = angular.module('js');

app.controller('MyCommitmentsCtrl', function($scope, $location, $route, NotificationSvc, CommitmentSvc, MyCommitmentsCacheSvc, IdentitySvc) {
	$scope.busyPromise = CommitmentSvc.findByUser(IdentitySvc.currentUser._id);

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	$scope.editCommitment = function(id) {
		$location.path('editCommitment/' + id);
	};

	$scope.editTravelExpenses = function(id) {
		$location.path('editTravelExpenses/' + id);
	};

	$scope.updateIsCleared = function(id, isCleared) {
		CommitmentSvc.updateIsCleared(id, isCleared)
		.error(function(err) {
			NotificationSvc.warn(err);
		})
		.success(function(success) {
			NotificationSvc.notify('Abrechnung geändert');
		});
	}

	$scope.deleteCommitment = function(id) {
		CommitmentSvc.delete(id).then(function(err, com) {
			$route.reload();
		});
	};

	$scope.calcBudgetSum = function(grp) {
		var sum = 0;
		if(grp['business'])
			sum += (grp['business'][0] ? grp['business'][0].eventId.budgetBusiness : 0);
		if(grp['food'])
			sum += (grp['food'][0] ? grp['food'][0].eventId.budgetFood : 0);
		return sum;
	};

	$scope.hasCleared = function(grp) {
		var hasCleared = false;
		_.forEach(grp, function(value) { if(!value.isCleared) { hasCleared = true; }});
		return hasCleared;
	};

	$scope.toggleVisibility = function(grpArray) {
		_.forEach(grpArray, function(value) { value['isHidden'] = !value['isHidden']});
	};

	$scope.updateEventFilter = function() {
		MyCommitmentsCacheSvc.currentEventIdFilter = $scope.eventIdFilter;
	}

	$scope.isOverBudget = function(grpArray, type) {
		if (type === 'business')
				return $scope.sumGrpAll(grpArray) > ((grpArray && grpArray.length > 0) ? grpArray[0].eventId.budgetBusiness : 0);
		if (type === 'food')
				return $scope.sumGrpAll(grpArray) > ((grpArray && grpArray.length > 0) ? grpArray[0].eventId.budgetFood : 0);
	};

	$scope.sumGrp = function(ar, reducer) {
		return Math.round(_.reduce(ar, reducer, 0) * 100) / 100;
	};

	$scope.withTwoDecPlaces = function(amount) {
		return amount ? amount.toFixed(2) : 0;
	}

	$scope.formatDec = function(amount) {
		// return parseFloat(Math.round(amount * 100) / 100).toFixed(2);
		return amount ? parseFloat(Math.round(amount * 100) / 100) : 0;
	};

	$scope.sumSummaryBy = function(prop1, prop2) {
		var sum = _.reduce($scope.summaries, function(s,i) {return s + ((prop2) ? i[prop1][prop2] : i[prop1]);}, 0);
		return $scope.formatDec(sum);
	}

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
		else if (grp.hasOwnProperty('travel'))
			return grp['travel'][0].eventId.location + ' - ' + grp['travel'][0].eventId.name;
		return "";
	};

	$scope.loadCommitmentsByAmount = function() {
		console.log("filter", $scope.amountFilter);
		if(!$scope.amountFilter) return;
		CommitmentSvc.findByAmount($scope.amountFilter).success(function(commitments) {
			$scope.sum = Math.round(_.reduce(commitments, function(sum, object) {
				return sum + object.amount;
			}, 0) * 100) / 100;
			// console.log("com", commitments);
			$scope.commitments = _.reduce(commitments, function(acc, com) {
				var key1 = com.eventId._id;
				var key2 = com.type;
				acc[key1] = acc[key1] || {};
			 	acc[key1][key2] = acc[key1][key2] || [];
				com['isHidden'] = false;
				acc[key1][key2].push(com);
			 	return acc;
			}, {});
		})
	}

	$scope.loadCommitmentsByEvent = function() {
		if(!$scope.eventIdFilter) return;
		CommitmentSvc.findByEvent($scope.eventIdFilter).success(function(commitments) {
			$scope.sum = Math.round(_.reduce(commitments, function(sum, object) {
				return sum + object.amount;
			}, 0) * 100) / 100;
			// console.log("com", commitments);
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
	};

	$scope.authorizeEvents = function(evs) {
		var result = [];
		for(var i=0; i < evs.length; i++) {
			var e = evs[i];
			if(IdentitySvc.isAdmin()) result.push(e);
			else if (IdentitySvc.isFAdmin() && IdentitySvc.getAllEvents().indexOf(e._id) > -1) result.push(e);
		}
		return result;
	}

	$scope.loadEvents = function() {
			CommitmentSvc.getSelectionParams()
				.error(function(err) {
					NotificationSvc.warn(err);
				})
				.success(function(evs) {
					console.log("events loaded");	
					$scope.events = _.map($scope.authorizeEvents(evs), function(ev) {
							return {
								_id: ev._id,
								name: ev.location + ' - ' + ev.name
							}
					});
				});
	};

	// if(IdentitySvc.isFAdmin() && !IdentitySvc.isAdmin()) {
	// 	CommitmentSvc.findByEvent(IdentitySvc.currentUser.eventId).success(function(commitments) {
	// 		$scope.sum = Math.round(_.reduce(commitments, function(sum, object) {
	// 			return sum + object.amount;
	// 		}, 0) * 100) / 100;

	// 		$scope.commitments = _.reduce(commitments, function(acc, com) {
	// 			var key1 = com.eventId._id;
	// 			var key2 = com.type;
	// 			acc[key1] = acc[key1] || {};
	// 		 	acc[key1][key2] = acc[key1][key2] || [];
	// 			com['isHidden'] = true;
	// 			acc[key1][key2].push(com);
	// 		 	return acc;
	// 		}, {});
	// 	});
	// }
	$scope.loadEvents();
	if(MyCommitmentsCacheSvc.hasEventFilterParameter()) {
		$scope.eventIdFilter = MyCommitmentsCacheSvc.currentEventIdFilter;
		$scope.loadCommitmentsByEvent();
	}
	if(IdentitySvc.isAdmin()) {
		CommitmentSvc.getAdminSummary()
			.success(function(summaries) {
				$scope.summaries = summaries;
			});
		
	}
});
