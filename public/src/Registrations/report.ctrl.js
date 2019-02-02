var app = angular.module('js');

app.controller('ReportCtrl', function($scope, $location, $route, RegistrationSvc, NotificationSvc, ReportCacheSvc, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.find() || RegistrationSvc.updateIsPaymentDone();

	var host = $location.$$host.toLowerCase();
	$scope.platform = PlatformSvc;

	// default values
	$scope.yearFilter = (new Date()).getFullYear();

  	$scope.getReportData = function() {
    	RegistrationSvc.find($scope.eventIdFilter, $scope.activityIdFilter, $scope.yearFilter, $scope.nameFilter, $scope.firstnameFilter, $scope.receiptFilter)
				.success(function (regs) {
            		$scope.registrations = regs;
            		$scope.emails = _.uniq(_.map($scope.registrations, function(r) {
                		return r.emailParent;
					})).join(';');
					console.log(_.partition($scope.registrations, function(r) {return r.isPaymentDone}),
								_.partition($scope.registrations, function(r) {return r.isPaymentDone})[0],
								_.partition($scope.registrations, function(r) {return r.isPaymentDone})[0].length)
					$scope.updateMasterIsPaymentDone();
    			});
	//.error(function(err) {
	//	console.log("error", err);
	//})
	};

	$scope.updateMasterIsPaymentDone = function() {
		$scope.masterIsPaymentDone = _.partition($scope.registrations, function(r) {return r.isPaymentDone})[0].length === $scope.registrations.length;
	}
	  
	$scope.calculateFee = function(reg) {
		if(reg.activityId.eventId.deadline) {
			if((moment(reg.activityId.eventId.deadline).hour(23).minute(59).second(59)).isBefore(moment(reg.registrationDate))) return reg.activityId.eventId.feePerWeek + reg.activityId.eventId.penalty;
			return reg.activityId.eventId.feePerWeek;
		}
		return reg.activityId.eventId.feePerWeek;
	}

	$scope.calculateOverallFee = function(registrations) {
		if(!registrations) return 0;
		var sum = 0;
		for(var i = 0; i < registrations.length; i++) {
			sum += $scope.calculateFee(registrations[i]);
		}
		return sum;
	}

	$scope.clearEventSelection = function() {
		$scope.eventIdFilter = undefined;
		$scope.activityIdFilter = undefined;
		ReportCacheSvc.currentActivityIdFilter = undefined;
		ReportCacheSvc.currentEventIdFilter = undefined;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.clearActivitySelection = function() {
		$scope.activityIdFilter = undefined;
		ReportCacheSvc.currentActivityIdFilter = undefined;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.clearNameSelection = function() {
		$scope.nameFilter = undefined;
		ReportCacheSvc.currentNameFilter = undefined;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.clearFirstNameSelection = function() {
		$scope.firstnameFilter = undefined;
		ReportCacheSvc.currentFirstNameFilter = undefined;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.clearReceiptSelection = function() {
		$scope.receiptFilter = undefined;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.editRegistration = function(registrationId) {
		ReportCacheSvc.lastVerticalScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
		$location.path('editRegistration/' + registrationId);
	}

	$scope.deleteRegistration = function(registrationId) {
		ReportCacheSvc.lastVerticalScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
		RegistrationSvc.delete(registrationId).then(function(err, reg) {
			$route.reload();
		});
	};

	$scope.isOnWait = function(reg) {
		return reg.activityId.maxParticipants <= $scope.registrations.indexOf(reg);
	}

	$scope.isAfterDeadline = function(reg) {
		return reg.activityId.eventId.deadline < reg.registrationDate;
	}

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	$scope.filterActivities = function() {
		$scope.activities = [];
		$scope.activities = _.sortBy(_.filter($scope.allActivities, { parentId: $scope.eventIdFilter}),
			function(a) { return a.name;	});
	};

	$scope.updateEventFilter = function(isReload) {
		ReportCacheSvc.currentEventIdFilter = $scope.eventIdFilter;
		if(!isReload) { $scope.activityIdFilter = undefined; }
		$scope.filterActivities();
		$scope.updateActivityFilter(isReload);
	}

	$scope.updateActivityFilter = function(isCalledInternallyFromReload) {
		if(!isCalledInternallyFromReload) { ReportCacheSvc.currentActivityIdFilter = $scope.activityIdFilter; }
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.updateNameFilter = function() {
		ReportCacheSvc.currentNameFilter = $scope.nameFilter;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.updateFirstNameFilter = function() {
		ReportCacheSvc.currentFirstNameFilter = $scope.firstnameFilter;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.isBatchUpdateAllowed = function() {
		return $scope.registrations ? $scope.registrations.length <= 10 : false;
	}

	$scope.batchUpdateIsPaymentDone = function() {
		for(var i=0; i < $scope.registrations.length; i++) {
			var reg = $scope.registrations[i];
			$scope.updateIsPaymentDone(reg._id, $scope.masterIsPaymentDone);
		}
		$location.path('/report/');
	}

	$scope.updateBatchProperty = function(prop, value) {
		console.log(prop, value);
		for(var i=0; i < $scope.registrations.length; i++) {
			var reg = $scope.registrations[i];
			$scope.updateProperty(reg._id, prop, value);
		}
		$location.path('/report/');
	}

	$scope.updateProperty = function(id, prop, value) {
		RegistrationSvc.updateProp(id, prop, value)
		.error(function(err) {
			NotificationSvc.warn(err);
		})
		.success(function(success) {
			NotificationSvc.notify('Anmeldung geändert')
		})
	}

	$scope.updateIsPaymentDone = function(id, isPaymentDone) {
		RegistrationSvc.updateIsPaymentDone(id, isPaymentDone)
		.error(function(err) {
			NotificationSvc.warn(err);
			$scope.updateMasterIsPaymentDone();
		})
		.success(function(success) {
			NotificationSvc.notify('Anmeldung geändert');
		});
	}

	$scope.updateIsEmailNotified = function(id, isEmailNotified) {
		RegistrationSvc.updateIsEmailNotified(id, isEmailNotified)
		.error(function(err) {
				NotificationSvc.warn(err);
		})
		.success(function(success) {
			NotificationSvc.notify('Anmeldung geändert');
		});
	}

	if(ReportCacheSvc.hasSelectionData()) {
		$scope.events = ReportCacheSvc.events;
		$scope.allActivities = ReportCacheSvc.allActivities;
	} else {
		RegistrationSvc.getSelectionParams().success(function(params) {
			$scope.events = _.uniq(_.map(params, function(p) {
				return {
					_id: p.eventId._id,
					name: p.eventId.location + ' - ' + p.eventId.name,
					type: p.eventId.type
				}
			}), '_id');

			$scope.allActivities = _.uniq(_.map(params, function(p) {
				return {
					_id: p._id,
					parentId: p.eventId._id,
					name: p.name
				}
			}), '_id');

			$scope.activities = undefined;
			ReportCacheSvc.events = $scope.events;
			ReportCacheSvc.allActivities = $scope.allActivities;
		});
	}

	$scope.columns = new Array(
		{dbName: "firstNameChild" , colName: "Vorname"},
		{dbName: "lastNameChild", colName: "Nachname"},
		{dbName: "firstNameParents", colName: "Vorname Eltern"},
		{dbName: "lastNameParents", colName: "Nachname Eltern"},
		{dbName: "registrationDate", colName: "Anmeldedatum"},
		{dbName: "isPaymentDone", colName: "Bezahlt"},
		{dbName: "isEmailNotified", colName: "Benachrichtigt"},
		{dbName: "receiptNumber", colName: "Überweisungsnummer"}
	);

	if(ReportCacheSvc.hasEventFilterParameter()) {
		$scope.eventIdFilter = ReportCacheSvc.currentEventIdFilter;
		$scope.updateEventFilter(true);
	}
	if(ReportCacheSvc.hasActivityFilterParameter()) {
		$scope.activityIdFilter = ReportCacheSvc.currentActivityIdFilter;
		$scope.updateActivityFilter(false);
	}
	if(ReportCacheSvc.hasNameFilterParameter()) {
		$scope.nameFilter = ReportCacheSvc.currentNameFilter;
	}
	if(ReportCacheSvc.hasFirstNameFilterParameter()) {
		$scope.firstnameFilter = ReportCacheSvc.currentFirstNameFilter;
	}
	if(ReportCacheSvc.hasEventFilterParameter() || ReportCacheSvc.hasActivityFilterParameter() ||
       ReportCacheSvc.hasNameFilterParameter() || ReportCacheSvc.hasFirstNameFilterParameter()) {
		$scope.getReportData();
		if(ReportCacheSvc.hasLastVerticalScrollPosition()) {
			window.scroll(0,ReportCacheSvc.lastVerticalScrollPosition);
		}
	}
});
