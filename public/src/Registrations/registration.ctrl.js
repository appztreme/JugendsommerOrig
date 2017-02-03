var app = angular.module('js');

app.controller('RegistrationCtrl', function($scope, $routeParams, $filter, $location, NotificationSvc, RegistrationSvc, RegistrationCacheSvc, IdentitySvc) {
	RegistrationSvc.activityId = $routeParams.activityId;
	$scope.activityId = $routeParams.activityId;

	// $scope.busyPromise = RegistrationSvc.create();

	$scope.type = $routeParams.type;
	$scope.cities = ['Deutschnofen', 'Jenesien', 'Karneid', 'Mölten', 'Ritten', 'Sarntal', 'Tiers', 'Vöran', 'Welschnofen', 'Andere'];
	$scope.cityChild = 'Deutschnofen';
	// RegistrationSvc.getCities()
	// 	.success(function(cities) {
	// 		console.log("CITIES", cities);
	// 		$scope.cities = cities;
	// 	}).error(function(err) {
	// 		console.log("city load error", err);
	// 	});

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
			$scope.needsPreCare = RegistrationCacheSvc.lastRegistration.needsPreCare;
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
				userId: IdentitySvc.currentUser._id,
				needsPreCare: $scope.needsPreCare
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
				$scope.needsPreCare = false
				RegistrationCacheSvc.lastRegistration = reg;
			}).then(function() {
				NotificationSvc.notify('Anmeldung erfolgreich gespeichert');
				$location.path('/');
			});
		}
	};

	$scope.$watch('firstNameParent', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.firstNameParent = newValue;
	});
	$scope.$watch('lastNameParent', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.lastNameParent = newValue;
	});
	$scope.$watch('phoneNumberParent', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.phoneNumberParent = newValue;
	});
	$scope.$watch('emailParent', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.emailParent = newValue;
	});
	$scope.$watch('firstNameChild', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.firstNameChild = newValue;
	});
	$scope.$watch('lastNameChild', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.lastNameChild = newValue;
	});
	$scope.$watch('birthdayChild', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.birthdayChild = newValue;
	});
	$scope.$watch('schoolChild', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.schoolChild = newValue;
	});
	$scope.$watch('healthChild', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.healthChild = newValue;
	});
	$scope.$watch('addressChild', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.addressChild = newValue;
	});$scope.$watch('cityChild', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.cityChild = newValue;
	});
	$scope.$watch('bandName', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.bandName = newValue;
	});
	$scope.$watch('instrument', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.instrument = newValue;
	});
	$scope.$watch('instrumentYears', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.instrumentYears = newValue;
	});
	$scope.$watch('nameContact1', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.nameContact1 = newValue;
	});
	$scope.$watch('telContact1', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.telContact1 = newValue;
	});
	$scope.$watch('nameContact2', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.nameContact2 = newValue;
	});
	$scope.$watch('telContact2', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.telContact2 = newValue;
	});
	$scope.$watch('needsPreCare', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.needsPreCare = newValue;
	});

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
		$scope.needsPreCare = RegistrationCacheSvc.currentRegistration.needsPreCare;
		RegistrationCacheSvc.currentRegistration = undefined;
	}
});
