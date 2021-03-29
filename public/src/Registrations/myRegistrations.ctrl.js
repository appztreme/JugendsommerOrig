var app = angular.module('js');

app.controller('MyRegistrationsCtrl', function($scope, FileSaver, Blob, $location, $route, RegistrationSvc, NotificationSvc, IdentitySvc, $rootScope, $translate, PlatformSvc) {
	$scope.busyPromise = RegistrationSvc.findByUser(IdentitySvc.currentUser._id);

	// var host = $location.$$host.toLowerCase();
	// $scope.isKiso = host.indexOf('kiso') !== -1;
	$scope.platform = PlatformSvc;
	$scope.confirmationLang = 'de';

	$scope.setConfirmationLang = function(l) {
		$scope.confirmationLang = l;
	}

	$scope.isDownloadDisabled = function(reg) {
		if(!reg.isPaymentDone) return true;
		else {
			if(Date.now() < new Date("2021-03-21")) return true;
			else return false;
		}
	}

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

	$scope.downloadConfirmation = function(reg, registrationId, lang) {
		if($scope.isDownloadDisabled(reg)) return;
		RegistrationSvc.getMyConfirmation(registrationId, lang)
			.success(function(pdf) {
				var blob = new Blob([pdf], {type: 'application/pdf'});
				//var txt = await blob.text();
				//console.log("blob",  blob.size)
				NotificationSvc.notify("Download");
             	FileSaver.saveAs(blob, "confirmation.pdf");
			}).error(function(err) {
				NotificationSvc.warn(err);
				//console.log("err", err);
			})
	}

	RegistrationSvc.findByUser(IdentitySvc.currentUser._id).success(function(registrations) {
		//$scope.registrations = _.filter(registrations, function(reg) { return !reg.activityId.eventId.isInternal });//registrations;
		$scope.registrations = registrations;
		$scope.user = IdentitySvc.currentUser;
		//console.log("my reservations:", registrations.length, $scope.registrations.length, registrations);
	});
});
