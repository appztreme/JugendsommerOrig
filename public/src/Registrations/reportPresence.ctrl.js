var app = angular.module('js');

app.controller('ReportPresenceCtrl', function($scope, $location, $route, RegistrationSvc, NotificationSvc, PlatformSvc, IdentitySvc) {
	$scope.busyPromise = RegistrationSvc.find();

	var host = $location.$$host.toLowerCase();
	$scope.platform = PlatformSvc;

	$scope.yearFilter = (new Date()).getFullYear();

  	$scope.getReportData = function() {
    	RegistrationSvc.find($scope.eventIdFilter, $scope.activityIdFilter, $scope.yearFilter, null, null, null)
				.success(function (regs) {
					//console.log("regs", regs);
					for(var i=0; i < regs.length; i++) {
						var reg = regs[i];
						reg.eventDuration = $scope.getDateRange(reg.activityId.startDate, reg.activityId.endDate);
					}
					$scope.registrations = _.groupBy(regs, function(r) { return r.activityId._id; });
					
					console.log($scope.registrations);
					// if(regs.length > 0) {
					// 	var act = regs[0].activityId;
					// 	$scope.eventDuration = $scope.getDateRange(act.startDate, act.endDate);
					// }
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

			var tmpEvents = [];
			if(IdentitySvc.isFAdmin() && !IdentitySvc.isAdmin()) {
				for(var i=0; i < $scope.events.length; i++) {
					if(IdentitySvc.isAuthorizedForEvent("fadmin", $scope.events[i]._id)) {
					//console.log($scope.events[i], IdentitySvc.currentUser);
					//if($scope.events[i] === IdentitySvc.currentUser.eventId) {
						tmpEvents.push($scope.events[i]);
					}
				}
				$scope.events = tmpEvents;
			}
			

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
