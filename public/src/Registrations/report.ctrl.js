var app = angular.module('js');

app.controller('ReportCtrl', function($scope, $location, $route, RegistrationSvc, ReportCacheSvc) {
	$scope.busyPromise = RegistrationSvc.find();

  $scope.getReportData = function() {
    RegistrationSvc.find($scope.eventIdFilter, $scope.activityIdFilter)
				.success(function (regs) {
            $scope.registrations = regs;
            $scope.emails = _.uniq(_.map($scope.registrations, function(r) {
                return r.emailParent;
            })).join(';');
    });
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

	$scope.editRegistration = function(registrationId) {
		$location.path('editRegistration/' + registrationId);
	}

	$scope.deleteRegistration = function(registrationId) {
		RegistrationSvc.delete(registrationId).then(function(err, reg) {
			$route.reload();
		});
	};

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	$scope.filterActivities = function() {
		$scope.activities = _.filter($scope.allActivities, { parentId: $scope.eventIdFilter});
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

	if(ReportCacheSvc.hasSelectionData()) {
		$scope.events = ReportCacheSvc.events;
		$scope.allActivities = ReportCacheSvc.allActivities;
	} else {
		RegistrationSvc.getSelectionParams().success(function(params) {
			$scope.events = _.uniq(_.map(params, function(p) {
				return {
					_id: p.eventId._id,
					name: p.eventId.location + ' - ' + p.eventId.name
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
	}
});
