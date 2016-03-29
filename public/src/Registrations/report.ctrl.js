var app = angular.module('js');

app.controller('ReportCtrl', function($scope, $location, $route, RegistrationSvc) {
	$scope.busyPromise = RegistrationSvc.find();
    
    $scope.getReportData = function() {
      if(!$scope.activityIdFilter) return;
      RegistrationSvc.find($scope.activityIdFilter)
        .success(function (regs) {
            $scope.registrations = regs;
            $scope.emails = _.uniq(_.map($scope.registrations, function(r) {
                return r.emailParent;
            })).join(';');
        });
    };

	$scope.canSelectActivity = function() {
		return $scope.eventIdFilter;
	};
    
    $scope.canLoadData = function() {
      return $scope.activityIdFilter != null;  
    };

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

	$scope.$watch('eventIdFilter', function() {
		if(!$scope.eventIdFilter) return;
		$scope.activityIdFilter = undefined;
		$scope.activities = _.filter($scope.allActivities, { parentId: $scope.eventIdFilter});
	});

	$scope.$watch('colNameSort', function() {
		console.log($scope.colNameSort);
	});

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

		$scope.columns = new Array(
			{dbName: "firstNameChild" , colName: "Vorname"},
			{dbName: "lastNameChild", colName: "Nachname"},
			{dbName: "firstNameParents", colName: "Vorname Eltern"},
			{dbName: "lastNameParents", colName: "Nachname Eltern"},
			{dbName: "registrationDate", colName: "Anmeldedatum"},
			{dbName: "isPaymentDone", colName: "Bezahlt"},
			{dbName: "isEmailNotified", colName: "Benachrichtigt"}
		);
	});
});
