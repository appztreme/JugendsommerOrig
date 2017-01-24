var app = angular.module('js');

app.controller('RegistrationCtrl', function($scope, $routeParams, $filter, $location, NotificationSvc, RegistrationSvc, RegistrationCacheSvc, IdentitySvc) {
	RegistrationSvc.activityId = $routeParams.activityId;
	$scope.activityId = $routeParams.activityId;

	$scope.busyPromise = RegistrationSvc.create();

	RegistrationSvc.getCities()
		.success(function(cities) {
			$scope.cities = cities;
		});

	RegistrationSvc.getEventType($routeParams.activityId)
		.error(function(err) {
			$scope.type = 'summer';
			console.log($scope.type);
		})
		.success(function(activity) {
			$scope.type = activity.eventId.type;
			console.log($scope.type);
		});

	$scope.isRegistrationAllowed = function() {
		return $scope.registrationForm.$valid && $scope.acceptAGB;
	};

	$scope.hasCachedRegistration = function() {
		return RegistrationCacheSvc.isNotEmptyCache();
	};

	$scope.updateFromCache = function() {
		if(RegistrationCacheSvc.isNotEmptyCache()) {
			$scope.firstNameParent = RegistrationCacheSvc.lastRegistration.firstNameParent;
			$scope.lastNameParent =  RegistrationCacheSvc.lastRegistration.lastNameParent;
			$scope.phoneNumberParent = RegistrationCacheSvc.lastRegistration.phoneNumberParent;
			$scope.emailParent = RegistrationCacheSvc.lastRegistration.emailParent;
			$scope.firstNameChild = RegistrationCacheSvc.lastRegistration.firstNameChild;
			$scope.lastNameChild = RegistrationCacheSvc.lastRegistration.lastNameChild;
			$scope.birthdayChild = $filter('date')(new Date(RegistrationCacheSvc.lastRegistration.birthdayChild), 'yyyy-MM-dd');
			$scope.schoolChild = RegistrationCacheSvc.lastRegistration.schoolChild;
			$scope.healthChild = RegistrationCacheSvc.lastRegistration.healthChild;
			$scope.addressChild = RegistrationCacheSvc.lastRegistration.addressChild;
			$scope.cityChild = RegistrationCacheSvc.lastRegistration.cityChild;
			$scope.bandName = RegistrationCacheSvc.lastRegistration.bandName;
			$scope.instrument = RegistrationCacheSvc.lastRegistration.instrument;
			$scope.instrumentYears = RegistrationCacheSvc.lastRegistration.instrumentYears;
			$scope.nameContact1 = RegistrationCacheSvc.lastRegistration.nameContact1;
			$scope.telContact1 = RegistrationCacheSvc.lastRegistration.telContact1;
			$scope.nameContact2 = RegistrationCacheSvc.lastRegistration.nameContact2;
			$scope.telContact2 =  RegistrationCacheSvc.lastRegistration.telContact2;
		}
	};

	$scope.save = function() {
		if($scope.registrationForm.$valid) {
			RegistrationSvc.create({
				firstNameParent: $scope.firstNameParent,
				lastNameParent: $scope.lastNameParent,
				phoneNumberParent: $scope.phoneNumberParent,
				emailParent: $scope.emailParent,
				firstNameChild: $scope.firstNameChild,
				lastNameChild: $scope.lastNameChild,
				birthdayChild: $scope.birthdayChild,
				schoolChild: $scope.schoolChild,
				healthChild: $scope.healthChild,
				addressChild: $scope.addressChild,
				cityChild: $scope.cityChild,
				bandName: $scope.bandName,
				instrument: $scope.instrument,
				instrumentYears: $scope.instrumentYears,
				nameContact1: $scope.nameContact1,
				telContact1: $scope.telContact1,
				nameContact2: $scope.nameContact2,
				telContact2: $scope.telContact2,
				activityId: RegistrationSvc.activityId,
				userId: IdentitySvc.currentUser._id
			})
			.error(function(err) {
				if(err.indexOf('duplicate key error index') > -1) {
					NotificationSvc.warn("Doppelte Anmeldungen pro Veranstaltung sind nicht möglich");
				}
			})
			.success(function(reg) {
				$scope.firstNameParent = null;
				$scope.lastNameParent = null;
				$scope.phoneNumberParent = null;
				$scope.emailParent = null;
				$scope.firstNameChild = null;
				$scope.lastNameChild = null;
				$scope.birthdayChild = null;
				$scope.schoolChild = null;
				$scope.healthChild = null;
				$scope.addressChild = null;
				$scope.bandName = null;
				$scope.instrument = null;
				$scope.instrumentYears = null;
				$scope.nameContact1 = null;
				$scope.telContact1 = null;
				$scope.nameContact2 = null;
				$scope.telContact2 = null;
				RegistrationCacheSvc.lastRegistration = reg;
			}).then(function() {
				NotificationSvc.notify('Anmeldung erfolgreich gespeichert');
				$location.path('/');
			});
		}
	};

	$scope.$watch(function()  { $scope.setCurrentRegistration(); }, null);

	$scope.setCurrentRegistration = function() {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.firstNameParent = $scope.firstNameParent;
		RegistrationCacheSvc.currentRegistration.lastNameParent =  $scope.lastNameParent;
		RegistrationCacheSvc.currentRegistration.phoneNumberParent = $scope.phoneNumberParent;
		RegistrationCacheSvc.currentRegistration.emailParent = $scope.emailParent;
		RegistrationCacheSvc.currentRegistration.firstNameChild = $scope.firstNameChild;
		RegistrationCacheSvc.currentRegistration.lastNameChild = $scope.lastNameChild;
		RegistrationCacheSvc.currentRegistration.birthdayChild = $scope.birthdayChild;
		RegistrationCacheSvc.currentRegistration.schoolChild = $scope.schoolChild;
		RegistrationCacheSvc.currentRegistration.healthChild = $scope.healthChild;
		RegistrationCacheSvc.currentRegistration.addressChild = $scope.addressChild;
		RegistrationCacheSvc.currentRegistration.cityChild = $scope.cityChild;
		RegistrationCacheSvc.currentRegistration.bandName = $scope.bandName;
		RegistrationCacheSvc.currentRegistration.instrument = $scope.instrument;
		RegistrationCacheSvc.currentRegistration.instrumentYears = $scope.instrumentYears;
		RegistrationCacheSvc.currentRegistration.nameContact1 = $scope.nameContact1;
		RegistrationCacheSvc.currentRegistration.telContact1 = $scope.telContact1;
		RegistrationCacheSvc.currentRegistration.nameContact2 = $scope.nameContact2;
		RegistrationCacheSvc.currentRegistration.telContact2 =  $scope.telContact2;
	};

	if(RegistrationCacheSvc.hasCurrentRegistration()) {
		$scope.firstNameParent = RegistrationCacheSvc.currentRegistration.firstNameParent;
		$scope.lastNameParent =  RegistrationCacheSvc.currentRegistration.lastNameParent;
		$scope.phoneNumberParent = RegistrationCacheSvc.currentRegistration.phoneNumberParent;
		$scope.emailParent = RegistrationCacheSvc.currentRegistration.emailParent;
		$scope.firstNameChild = RegistrationCacheSvc.currentRegistration.firstNameChild;
		$scope.lastNameChild = RegistrationCacheSvc.currentRegistration.lastNameChild;
		if(RegistrationCacheSvc.currentRegistration.birthdayChild){
		$scope.birthdayChild = $filter('date')(new Date(RegistrationCacheSvc.currentRegistration.birthdayChild), 'yyyy-MM-dd');
		}
		$scope.schoolChild = RegistrationCacheSvc.currentRegistration.schoolChild;
		$scope.healthChild = RegistrationCacheSvc.currentRegistration.healthChild;
		$scope.addressChild = RegistrationCacheSvc.currentRegistration.addressChild;
		$scope.cityChild = RegistrationCacheSvc.currentRegistration.cityChild;
		$scope.bandName = RegistrationCacheSvc.currentRegistration.bandName;
		$scope.instrument = RegistrationCacheSvc.currentRegistration.instrument;
		$scope.instrumentYears = RegistrationCacheSvc.currentRegistration.instrumentYears;
		$scope.nameContact1 = RegistrationCacheSvc.currentRegistration.nameContact1;
		$scope.telContact1 = RegistrationCacheSvc.currentRegistration.telContact1;
		$scope.nameContact2 = RegistrationCacheSvc.currentRegistration.nameContact2;
		$scope.telContact2 =  RegistrationCacheSvc.currentRegistration.telContact2;
		RegistrationCacheSvc.currentRegistration = undefined;
	}
});
