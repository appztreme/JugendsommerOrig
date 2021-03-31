//const moment = require("moment");

var app = angular.module('js');

app.controller('ReportPresenceCtrl', function($scope, $location, $route, RegistrationSvc, NotificationSvc, PlatformSvc, IdentitySvc) {
	$scope.busyPromise = RegistrationSvc.find();

	var host = $location.$$host.toLowerCase();
	$scope.platform = PlatformSvc;

	$scope.yearFilter = (new Date()).getFullYear();

	$scope.updatePresence = function(presence, isPresent, registrationId) {
		console.log(presence.date);
		RegistrationSvc.updatePresence(presence._id, registrationId, presence.date, isPresent)
				.success(function(p) {
					//console.log("success", p);
					presence._id = p._id;
					presence.isPresent = p.isPresent;
					NotificationSvc.notify("Update erfolgreich");
				})
				.error(function(err) {
					NotificationSvc.warn("Fehler beim Update")
				})
	}

  	$scope.getReportData = function() {
    	RegistrationSvc.find($scope.eventIdFilter, $scope.activityIdFilter, $scope.yearFilter, null, null, null)
				.success(function (regs) {
					RegistrationSvc.getPresencePerActivity($scope.activityIdFilter)
						.success(function(presences) {
							//console.log(presences.length);
							for(var i=0; i < regs.length; i++) {
								var reg = regs[i];
								//console.log(p.registrationId.toString() == reg._id.toString());
								var presReg = _.filter(presences, function(p) { return p.registrationId._id.toString() == reg._id.toString() });
								//console.log(presReg.length);
								reg.eventDuration = $scope.getDateRange(reg.activityId.startDate, reg.activityId.endDate, presReg);			
							}
							$scope.registrations = _.groupBy(regs, function(r) { return r.activityId._id; });
							//console.log($scope.registrations)
						});
    			});
	};

	$scope.getDateRange = function(from, to, presences) {
		var range = [];
		var d = moment(from);
		while(d <= moment(to)) {
			var dformat = d.locale('de').format('dddd DD.MM.YY');
			var curPresence = undefined;
			for(var i=0; i < presences.length; i++) {
				//console.log(d == moment(presences[i].date),d, moment(presences[i].date).locale('de'));
				if(moment(presences[i].date).isSame(d)) {
					//console.log("match")
					curPresence = presences[i];
					break;	
				}	
			}
			if(curPresence) { curPresence["label"] = dformat; } else { curPresence = { "label": dformat, date: new Date(d.toDate()), isPresent: false }}
			range.push(curPresence);
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
