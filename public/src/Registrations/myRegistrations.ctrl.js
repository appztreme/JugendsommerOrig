var app = angular.module('js');

app.controller('MyRegistrationsCtrl', function($scope, FileSaver, Blob, $location, $route, RegistrationSvc, IdentitySvc, $rootScope, $translate, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.findByUser(IdentitySvc.currentUser._id);

	// var host = $location.$$host.toLowerCase();
	// $scope.isKiso = host.indexOf('kiso') !== -1;
	$scope.platform = PlatformSvc;

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

	$scope.formatBool = function(b) {
		if(b) return $scope.lang == 'de' ? "ja" : "si";
		return $scope.lang == 'de' ? "nein" : "no";
	};

	$scope.deleteRegistration = function(registrationId) {
		RegistrationSvc.deleteByUser(registrationId).then(function(err, reg) {
			$route.reload();
		});
	};

	$scope.downloadConfirmation = function(firstName, lastName, birthday, eventId) {
		RegistrationSvc.sendConfirmationMailSingle(eventId, firstName, lastName, birthday, $scope.user.userEmail)
			.success(function(r) {
			if(r.success) NotificationSvc.notify("Erfolgreich verschickt");
			else NotificationSvc.warn("Fehler beim Verschicken");
		});
		// RegistrationSvc.getMyConfirmation(firstName, lastName, birthday, eventId)
		// 	.success(function(pdf) {
		// 		var blob = new Blob([pdf], {type: 'application/pdf'});
		// 		//var txt = await blob.text();
		// 		console.log("blob",  blob.size)
        //      	FileSaver.saveAs(blob, "confirmation.pdf");
		// 	})
	}

	RegistrationSvc.findByUser(IdentitySvc.currentUser._id).success(function(registrations) {
		$scope.registrations = _.filter(registrations, function(reg) { return !reg.activityId.eventId.isInternal });//registrations;
		$scope.user = IdentitySvc.currentUser;
		//console.log("my reservations:", registrations.length, $scope.registrations.length, registrations);
	});
});
