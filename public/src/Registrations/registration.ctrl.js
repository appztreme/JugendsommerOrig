var app = angular.module('js');

app.controller('RegistrationCtrl', function($scope, $routeParams, $filter, $location, NotificationSvc, RegistrationSvc, RegistrationCacheSvc, IdentitySvc) {
	RegistrationSvc.activityId = $routeParams.activityId;
	$scope.activityId = $routeParams.activityId;

	$scope.busyPromise = RegistrationSvc.create();

	$scope.type = $routeParams.type;
	$scope.cities = ['Afing', 'Deutschnofen', 'Jenesien', 'Karneid', 'Mölten', 'Neustift', 'Ritten', 'Sarntal', 'Tiers', 'Vöran', 'Welschnofen', 'Andere'];
	// RegistrationSvc.getCities()
	// 	.success(function(cities) {
	// 		console.log("CITIES", cities);
	// 		$scope.cities = cities;
	// 	}).error(function(err) {
	// 		console.log("city load error", err);
	// 	});

	// RegistrationSvc.getEventType($routeParams.activityId)
	// 	.error(function(err) {
	// 		$scope.type = 'summer';
	// 		console.log('error', $scope.type);
	// 	})
	// 	.success(function(activity) {
	// 		$scope.type = activity.eventId.type;
	// 		console.log($scope.type);
	// 	});

	$scope.isRegistrationAllowed = function() {
		return $scope.registrationForm.$valid && $scope.data.acceptAGB;
	};

	$scope.hasCachedRegistration = function() {
		return RegistrationCacheSvc.isNotEmptyCache();
	};

	$scope.updateFromCache = function() {
		if(RegistrationCacheSvc.isNotEmptyCache()) {
			$scope.data.firstNameParent = RegistrationCacheSvc.lastRegistration.firstNameParent;
			$scope.data.lastNameParent =  RegistrationCacheSvc.lastRegistration.lastNameParent;
			$scope.data.phoneNumberParent = RegistrationCacheSvc.lastRegistration.phoneNumberParent;
			$scope.data.emailParent = RegistrationCacheSvc.lastRegistration.emailParent;
			$scope.data.firstNameChild = RegistrationCacheSvc.lastRegistration.firstNameChild;
			$scope.data.lastNameChild = RegistrationCacheSvc.lastRegistration.lastNameChild;
			$scope.data.birthdayChild = $filter('date')(new Date(RegistrationCacheSvc.lastRegistration.birthdayChild), 'yyyy-MM-dd');
			$scope.data.schoolChild = RegistrationCacheSvc.lastRegistration.schoolChild;
			$scope.data.healthChild = RegistrationCacheSvc.lastRegistration.healthChild;
			$scope.data.addressChild = RegistrationCacheSvc.lastRegistration.addressChild;
			$scope.data.cityChild = RegistrationCacheSvc.lastRegistration.cityChild;
			$scope.data.bandName = RegistrationCacheSvc.lastRegistration.bandName;
			$scope.data.instrument = RegistrationCacheSvc.lastRegistration.instrument;
			$scope.data.instrumentYears = RegistrationCacheSvc.lastRegistration.instrumentYears;
			$scope.data.nameContact1 = RegistrationCacheSvc.lastRegistration.nameContact1;
			$scope.data.telContact1 = RegistrationCacheSvc.lastRegistration.telContact1;
			$scope.data.nameContact2 = RegistrationCacheSvc.lastRegistration.nameContact2;
			$scope.data.telContact2 =  RegistrationCacheSvc.lastRegistration.telContact2;
			$scope.data.needsPreCare = RegistrationCacheSvc.lastRegistration.needsPreCare;
		}
	};

	$scope.save = function() {
		if($scope.registrationForm.$valid) {
			RegistrationSvc.create({
				firstNameParent: $scope.data.firstNameParent,
				lastNameParent: $scope.data.lastNameParent,
				phoneNumberParent: $scope.data.phoneNumberParent,
				emailParent: $scope.data.emailParent,
				firstNameChild: $scope.data.firstNameChild,
				lastNameChild: $scope.data.lastNameChild,
				birthdayChild: $scope.data.birthdayChild,
				schoolChild: $scope.data.schoolChild,
				healthChild: $scope.data.healthChild,
				addressChild: $scope.data.addressChild,
				cityChild: $scope.data.cityChild,
				bandName: $scope.data.bandName,
				instrument: $scope.data.instrument,
				instrumentYears: $scope.data.instrumentYears,
				nameContact1: $scope.data.nameContact1,
				telContact1: $scope.data.telContact1,
				nameContact2: $scope.data.nameContact2,
				telContact2: $scope.data.telContact2,
				activityId: RegistrationSvc.activityId,
				userId: IdentitySvc.currentUser._id,
				needsPreCare: $scope.data.needsPreCare
			})
			.error(function(err) {
				if(err.indexOf('duplicate key error index') > -1) {
					NotificationSvc.warn("Doppelte Anmeldungen pro Veranstaltung sind nicht möglich");
				}
			})
			.success(function(reg) {
				$scope.data.firstNameParent = null;
				$scope.data.lastNameParent = null;
				$scope.data.phoneNumberParent = null;
				$scope.data.emailParent = null;
				$scope.data.firstNameChild = null;
				$scope.data.lastNameChild = null;
				$scope.data.birthdayChild = null;
				$scope.data.schoolChild = null;
				$scope.data.healthChild = null;
				$scope.data.addressChild = null;
				$scope.data.bandName = null;
				$scope.data.instrument = null;
				$scope.data.instrumentYears = null;
				$scope.data.nameContact1 = null;
				$scope.data.telContact1 = null;
				$scope.data.nameContact2 = null;
				$scope.data.telContact2 = null;
				$scope.data.needsPreCare = false
				RegistrationCacheSvc.lastRegistration = reg;
			}).then(function() {
				NotificationSvc.notify('Anmeldung erfolgreich gespeichert');
				$location.path('/');
			});
		}
	};

	// $scope.$watch(function()  { $scope.setCurrentRegistration(); }, null);
	$scope.$watch(function(scope) { return(scope.data) }, function(newValue, oldValue) {
		setCurrentRegistration(newValue);
	});

	const setCurrentRegistration = function(newValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		console.log("changed value", newValue);
		// RegistrationCacheSvc.currentRegistration.firstNameParent = $scope.data.firstNameParent;
		// RegistrationCacheSvc.currentRegistration.lastNameParent =  $scope.data.lastNameParent;
		// RegistrationCacheSvc.currentRegistration.phoneNumberParent = $scope.data.phoneNumberParent;
		// RegistrationCacheSvc.currentRegistration.emailParent = $scope.data.emailParent;
		// RegistrationCacheSvc.currentRegistration.firstNameChild = $scope.data.firstNameChild;
		// RegistrationCacheSvc.currentRegistration.lastNameChild = $scope.data.lastNameChild;
		// RegistrationCacheSvc.currentRegistration.birthdayChild = $scope.data.birthdayChild;
		// RegistrationCacheSvc.currentRegistration.schoolChild = $scope.data.schoolChild;
		// RegistrationCacheSvc.currentRegistration.healthChild = $scope.data.healthChild;
		// RegistrationCacheSvc.currentRegistration.addressChild = $scope.data.addressChild;
		// RegistrationCacheSvc.currentRegistration.cityChild = $scope.data.cityChild;
		// RegistrationCacheSvc.currentRegistration.bandName = $scope.data.bandName;
		// RegistrationCacheSvc.currentRegistration.instrument = $scope.data.instrument;
		// RegistrationCacheSvc.currentRegistration.instrumentYears = $scope.data.instrumentYears;
		// RegistrationCacheSvc.currentRegistration.nameContact1 = $scope.data.nameContact1;
		// RegistrationCacheSvc.currentRegistration.telContact1 = $scope.data.telContact1;
		// RegistrationCacheSvc.currentRegistration.nameContact2 = $scope.data.nameContact2;
		// RegistrationCacheSvc.currentRegistration.needsPreCare = $scope.data.needsPreCare;
		// RegistrationCacheSvc.currentRegistration.telContact2 =  $scope.data.telContact2;
	};

	if(RegistrationCacheSvc.hasCurrentRegistration()) {
		$scope.data.firstNameParent = RegistrationCacheSvc.currentRegistration.firstNameParent;
		$scope.data.lastNameParent =  RegistrationCacheSvc.currentRegistration.lastNameParent;
		$scope.data.phoneNumberParent = RegistrationCacheSvc.currentRegistration.phoneNumberParent;
		$scope.data.emailParent = RegistrationCacheSvc.currentRegistration.emailParent;
		$scope.data.firstNameChild = RegistrationCacheSvc.currentRegistration.firstNameChild;
		$scope.data.lastNameChild = RegistrationCacheSvc.currentRegistration.lastNameChild;
		if(RegistrationCacheSvc.currentRegistration.birthdayChild){
		$scope.data.birthdayChild = $filter('date')(new Date(RegistrationCacheSvc.currentRegistration.birthdayChild), 'yyyy-MM-dd');
		}
		$scope.data.schoolChild = RegistrationCacheSvc.currentRegistration.schoolChild;
		$scope.data.healthChild = RegistrationCacheSvc.currentRegistration.healthChild;
		$scope.data.addressChild = RegistrationCacheSvc.currentRegistration.addressChild;
		$scope.data.cityChild = RegistrationCacheSvc.currentRegistration.cityChild;
		$scope.data.bandName = RegistrationCacheSvc.currentRegistration.bandName;
		$scope.data.instrument = RegistrationCacheSvc.currentRegistration.instrument;
		$scope.data.instrumentYears = RegistrationCacheSvc.currentRegistration.instrumentYears;
		$scope.data.nameContact1 = RegistrationCacheSvc.currentRegistration.nameContact1;
		$scope.data.telContact1 = RegistrationCacheSvc.currentRegistration.telContact1;
		$scope.data.nameContact2 = RegistrationCacheSvc.currentRegistration.nameContact2;
		$scope.data.telContact2 =  RegistrationCacheSvc.currentRegistration.telContact2;
		$scope.data.needsPreCare = RegistrationCacheSvc.currentRegistration.needsPreCare;
		RegistrationCacheSvc.currentRegistration = undefined;
	}
});
