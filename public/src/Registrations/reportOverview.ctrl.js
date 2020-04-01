var app = angular.module('js');

app.controller('ReportOverviewCtrl', function($scope, $location, $route, RegistrationSvc, NotificationSvc, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.find();

	// console.log("overview test")
	var host = $location.$$host.toLowerCase();
	$scope.platform = PlatformSvc;

	$scope.yearFilter = (new Date()).getFullYear();

  	$scope.getReportData = function() {
    	RegistrationSvc.overview($scope.eventIdFilter, $scope.activityIdFilter, $scope.yearFilter)
				.success(function (regs) {
					$scope.registrations =  regs.registrations;
					$scope.activityNames = regs.activityNames.sort();
    			});
	};

	$scope.getDateRange = function(from, to) {
		var range = [];
		var d = moment(from);
		while(d <= moment(to)) {
			range.push(d.locale('de').format('dddd DD.MM.YY'));
			d.add(1, 'days');
		}
		return range;
	}

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	$scope.formatBoolToSymbol = function(b) {
		if(b) return "x";
		return "-";
	};
	  
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
		if($scope.eventIdFilter) {
			$scope.activities = _.sortBy(_.filter($scope.allActivities, { parentId: $scope.eventIdFilter}),
			function(a) { return a.name;	});
		} else {
			$scope.activities = $scope.allActivities;
		}
		
	};

	$scope.updateEventFilter = function(isReload) {
		if(!isReload) { $scope.activityIdFilter = undefined; }
		$scope.filterActivities();
		$scope.updateActivityFilter(isReload);
	}

	$scope.updateActivityFilter = function(isCalledInternallyFromReload) {
		$scope.registrations = undefined;
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
