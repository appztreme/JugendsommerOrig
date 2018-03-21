var app = angular.module('js');

app.controller('ReportPresenceCtrl', function($scope, $location, $route, RegistrationSvc, NotificationSvc, ReportCacheSvc, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.find() || RegistrationSvc.updateIsPaymentDone();

	var host = $location.$$host.toLowerCase();
	$scope.platform = PlatformSvc;

	// default values
	$scope.yearFilter = (new Date()).getFullYear();

  	$scope.getReportData = function() {
    	RegistrationSvc.find($scope.eventIdFilter, $scope.activityIdFilter, $scope.yearFilter, null, null, null)
				.success(function (regs) {
					$scope.registrations = regs;
					if(regs.length > 0) {
						var act = regs[0].activityId;
						$scope.eventDuration = $scope.getDateRange(act.startDate, act.endDate);
						console.log($scope.eventDuration);
					}
    			});
	};

	$scope.getDateRange = function(from, to) {
		var range = [];
		var d = moment(from);
		while(d <= moment(to)) {
			range.push(d);
			d = moment(d.add(1, 'days'));
			console.log("d", d);
		}
		return range;
	}
	  
	$scope.clearEventSelection = function() {
		$scope.eventIdFilter = undefined;
		$scope.activityIdFilter = undefined;
		$scope.registrations = undefined;
	}

	$scope.clearActivitySelection = function() {
		$scope.activityIdFilter = undefined;
		$scope.registrations = undefined;
	}

	
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

});
