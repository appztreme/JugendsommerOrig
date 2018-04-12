var app = angular.module('js');

app.controller('ReportOverviewCtrl', function($scope, $location, $route, RegistrationSvc, NotificationSvc, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.find();

	console.log("overview test")
	var host = $location.$$host.toLowerCase();
	$scope.platform = PlatformSvc;

	$scope.yearFilter = (new Date()).getFullYear();

	$scope.indexOfArray = function(array, fullName) {
		for(var i=0; i < array.length; i++) {
			if(array[i].fullName === fullName) return i;
		}
		return -1;
	}

	$scope.aggregateReportStructure = function(regs) {
		var output = [];
		var nameIndex = [];
		for(var i=0; i < regs.length; i++) {
			var r = regs[i];
			var fullName = r.lastNameChild + ' ' + r.firstNameChild;
			if(nameIndex.indexOf(fullName) > -1) {
				// UPDATE
				var outputIndex = indexOfArray(output, fullName);
				output[outputIndex][r.activityId._id] = true;
			} else {
				// INSERT
				nameIndex.push(fullName);
				var entry = {
					"event": r.activityId.eventId.location + ' - ' + r.activityId.eventId.name,
					"firstNameChild": r.firstNameChild,
					"lastNameChild": r.lastNameChild,
					"fullName": fullName,
					"birthdayChild": r.birthdayChild,
					"schollChild": r.schollChild,
					"addressChild": r.addressChild,
					"cityChild": r.cityChild,
					"phoneNumberParents": r.phoneNumberParents,
					"healthChild": r.healthChild,
					"canSwim": r.canSwim,
					"canGoHomeAllone": r.canGoHomeAllone,
					"commentInternal": r.commentInternal
				}
				for(var j=0; j < $scope.activities.length; j++) {
					entry[$scope.activities[j]._id] = false;
				}
				entry[r.activityId._id] = true;
				output.push(entry);
			}
		}
		return output;
	}

  	$scope.getReportData = function() {
    	RegistrationSvc.find($scope.eventIdFilter, $scope.activityIdFilter, $scope.yearFilter, null, null, null)
				.success(function (regs) {
					$scope.registrations = $scope.aggregateReportStructure(regs);
					
					console.log($scope.registrations);
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
