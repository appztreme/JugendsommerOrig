var app = angular.module('js');

app.controller('ReportPresenceCtrl', function($scope, $location, $route, RegistrationSvc, NotificationSvc, ReportCacheSvc, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.find();

	var host = $location.$$host.toLowerCase();
	$scope.platform = PlatformSvc;


  	$scope.getReportData = function() {
    	RegistrationSvc.find($scope.eventIdFilter, $scope.activityIdFilter, $scope.yearFilter, $scope.nameFilter, $scope.firstnameFilter, $scope.receiptFilter)
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
		});

});
