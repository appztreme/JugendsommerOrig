var app = angular.module('js');

app.controller('ReportCtrl', function($scope, $location, $route, RegistrationSvc, NotificationSvc, ReportCacheSvc, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.find() || RegistrationSvc.updateIsPaymentDone();

	var host = $location.$$host.toLowerCase();
	$scope.platform = PlatformSvc;

	// default values
	$scope.yearFilter = (new Date()).getFullYear();

  	$scope.getReportData = function() {
    	RegistrationSvc.find($scope.eventIdFilter, $scope.activityIdFilter, $scope.yearFilter, $scope.nameFilter)
				.success(function (regs) {
            		$scope.registrations = regs;
            		$scope.emails = _.uniq(_.map($scope.registrations, function(r) {
                		return r.emailParent;
            		})).join(';');
    			});
	//.error(function(err) {
	//	console.log("error", err);
	//})
  	};

	$scope.clearEventSelection = function() {
		$scope.eventIdFilter = undefined;
		$scope.activityIdFilter = undefined;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.clearActivitySelection = function() {
		$scope.activityIdFilter = undefined;
		$scope.registrations = undefined;
		$scope.emails = undefined;
	}

	$scope.clearNameSelection = function() {
		$scope.nameFilter = undefined;
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

	$scope.updateIsPaymentDone = function(id, isPaymentDone) {
		RegistrationSvc.updateIsPaymentDone(id, isPaymentDone)
		.error(function(err) {
			NotificationSvc.warn(err);
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
		{dbName: "isEmailNotified", colName: "Benachrichtigt"}
	);

	if(ReportCacheSvc.hasEventFilterParameter()) {
		$scope.eventIdFilter = ReportCacheSvc.currentEventIdFilter;
		$scope.updateEventFilter(true);
	}
	if(ReportCacheSvc.hasActivityFilterParameter()) {
		$scope.activityIdFilter = ReportCacheSvc.currentActivityIdFilter;
		$scope.updateActivityFilter(false);
	}
	if(ReportCacheSvc.hasEventFilterParameter() || ReportCacheSvc.hasActivityFilterParameter()) {
		$scope.getReportData();
		if(ReportCacheSvc.hasLastVerticalScrollPosition()) {
			window.scroll(0,ReportCacheSvc.lastVerticalScrollPosition);
		}
	}
});
