var app = angular.module('js');

app.controller('EventRegistrationCtrl', function($scope, $routeParams, EventsSvc, PlatformSvc) {
	$scope.platform = PlatformSvc;

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	$scope.getReportData = function() {
		EventsSvc.findRegistrations($scope.activityIdFilter, $routeParams.eventId).then(function(resp) {
			$scope.registrations = resp.data;
		});
	}

	$scope.updateSelection = function() {
		$scope.registrations = null;
	}

	$scope.clearActivitySelection = function() {
		$scope.activityIdFilter = undefined;
		$scope.registrations = null;
	}

	EventsSvc.getSelectionParams().success(function(params) {
		$scope.activities =  _.sortBy(_.filter(_.uniq(_.map(params, function(p) {
				return {
					_id: p._id,
					parentId: p.eventId._id,
					name: p.name
				}
			}), '_id'), {parentId: $routeParams.eventId}), ['name']);
		});
		
});