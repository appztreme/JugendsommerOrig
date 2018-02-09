var app = angular.module('js');

app.controller('RegistrationCtrl', function($scope, $routeParams, $filter, $location, NotificationSvc, RegistrationSvc, RegistrationCacheSvc, IdentitySvc, conf, $rootScope, $translate) {
	RegistrationSvc.eventId = $routeParams.eventId;
	$scope.eventId = $routeParams.eventId;

	$scope.acceptAGB = false;
	$scope.currentState = 1;
	$scope.selectedActivities = [];
	$scope.emailParentCheck = '';

	$scope.toggleActivity = function(id) {
		var index = $scope.selectedActivities.indexOf(id);
		if(index === -1) $scope.selectedActivities.push(id);
		else $scope.selectedActivities.splice(index, 1);
	}

	$scope.setState = function(state) {
		$scope.currentState = state;
	}

	var host = $location.$$host.toLowerCase();
	$scope.isKiso = host.indexOf('kiso') !== -1;

	//default values
	$scope.msgSuccess = 'Anmeldung erfolgreich gespeichert';
	$scope.msgNoDuplicates = 'Doppelte Anmeldungen pro Veranstaltung sind nicht möglich';

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();

		$translate(['RESERVATION.MSG_SUCCESS', 'RESERVATION.MSG_NO_DUPLICATES'])
			.then(function (translations) {
    			$scope.msgSuccess = translations['RESERVATION.MSG_SUCCESS'];
    			$scope.msgNoDuplicates = translations['RESERVATION.MSG_NO_DUPLICATES'];
  			}, function (translationIds) {
				$scope.msgSuccess = translationIds.reservation_msg_success;
    			$scope.msgNoDuplicates = translationIds.reservation_msg_no_duplicates;
  			});
    });

	// $scope.busyPromise = RegistrationSvc.create();

	$scope.type = $routeParams.type;
	$scope.cities = $scope.isKiso ? conf.cities_kiso : conf.cities_jdbl;
	$scope.tShirtSizes = conf.tSizes;
	$scope.cityChild = $scope.isKiso ? 'Bozen': 'Deutschnofen';
	$scope.needsPreCare = false;
	$scope.needsAbK = false;
	$scope.hasDisability = false;

	$scope.isEmailEqual = function() {
		if($scope.emailParent === '' || !$scope.emailParent || !$scope.emailParentCheck || $scope.emailParentCheck === '') return false;
		if($scope.emailParent === $scope.emailParentCheck) return true;
		return false;
	}

	$scope.canReserve = function(activity) {
        return activity.curParticipants < activity.maxParticipants;
    };

    $scope.canQueue = function(activity) {
        return activity.curParticipants >= activity.maxParticipants &&
               activity.curParticipants < (activity.maxParticipants + activity.queueSize);
    };

    $scope.canNotReserve = function(activity) {
        return activity.curParticipants >= (activity.maxParticipants + activity.queueSize);
	};
	
	$scope.getCountObj = function(activity) {
		return { count: activity.maxParticipants };
	}

	$scope.isChildDataComplete = function() {
		return $scope.registrationForm.$valid && $scope.isEmailEqual();
	}

	$scope.isActivityDataComplete = function() {
		return $scope.selectedActivities.length > 0;
	}

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
			$scope.emailParentCheck = RegistrationCacheSvc.lastRegistration.emailParent;
			$scope.firstNameChild = RegistrationCacheSvc.lastRegistration.firstNameChild;
			$scope.lastNameChild = RegistrationCacheSvc.lastRegistration.lastNameChild;
			$scope.birthdayChild = $filter('date')(new Date(RegistrationCacheSvc.lastRegistration.birthdayChild), 'yyyy-MM-dd');
			$scope.schoolChild = RegistrationCacheSvc.lastRegistration.schoolChild;
			$scope.healthChild = RegistrationCacheSvc.lastRegistration.healthChild;
			$scope.addressChild = RegistrationCacheSvc.lastRegistration.addressChild;
			$scope.cityChild = RegistrationCacheSvc.lastRegistration.cityChild;
			$scope.tShirtSize = RegistrationCacheSvc.lastRegistration.tShirtSize;
			$scope.bandName = RegistrationCacheSvc.lastRegistration.bandName;
			$scope.instrument = RegistrationCacheSvc.lastRegistration.instrument;
			$scope.instrumentYears = RegistrationCacheSvc.lastRegistration.instrumentYears;
			$scope.nameContact1 = RegistrationCacheSvc.lastRegistration.nameContact1;
			$scope.telContact1 = RegistrationCacheSvc.lastRegistration.telContact1;
			$scope.nameContact2 = RegistrationCacheSvc.lastRegistration.nameContact2;
			$scope.telContact2 =  RegistrationCacheSvc.lastRegistration.telContact2;
			$scope.needsPreCare = RegistrationCacheSvc.lastRegistration.needsPreCare;
			$scope.hasDisability = RegistrationCacheSvc.lastRegistration.hasDisability;
			$scope.disabilityDescription = RegistrationSvc.lastRegistration.disabilityDescription;
			$scope.needsAbK = RegistrationSvc.lastRegistration.needsAbK;
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
				addressChild: $scope.addressChild ? $scope.addressChild : 'Addresse',
				cityChild: $scope.cityChild,
				tShirtSize: $scope.tShirtSize,
				bandName: $scope.bandName,
				instrument: $scope.instrument,
				instrumentYears: $scope.instrumentYears,
				nameContact1: $scope.nameContact1,
				telContact1: $scope.telContact1,
				nameContact2: $scope.nameContact2,
				telContact2: $scope.telContact2,
				activityId: $scope.selectedActivities,
				userId: IdentitySvc.currentUser._id,
				needsPreCare: $scope.needsPreCare,
				hasDisability: $scope.hasDisability,
				disabilityDescription: $scope.disabilityDescription,
				needsAbK: $scope.needsAbK,
				type: $scope.type
			})
			.error(function(err) {
				if(err.indexOf('duplicate key error index') > -1) {
					NotificationSvc.warn($scope.msgNoDuplicates);
				}
			})
			.success(function(reg) {
				$scope.firstNameParent = null;
				$scope.lastNameParent = null;
				$scope.phoneNumberParent = null;
				$scope.emailParent = null;
				$scope.emailParentCheck = '';
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
				$scope.needsPreCare = false;
				$scope.hasDisability = false;
				$scope.disabilityDescription = null;
				$scope.needsAbK = false;
				$scope.selectedActivities = [];
				RegistrationCacheSvc.lastRegistration = reg[0];
				// console.log("last", RegistrationCacheSvc.lastRegistration, reg)
			}).then(function() {
				NotificationSvc.notify($scope.msgSuccess);
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
	});
	$scope.$watch('cityChild', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.cityChild = newValue;
	});
	$scope.$watch('tShirtSize', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.tShirtSize = newValue;
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
	$scope.$watch('hasDisability', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.hasDisability = newValue;
	});
	$scope.$watch('disabilityDescription', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.disabilityDescription = newValue;
	});
	$scope.$watch('needsAbK', function(newValue, oldValue) {
		if(!RegistrationCacheSvc.hasCurrentRegistration()) {
			RegistrationCacheSvc.currentRegistration = {};
		}
		RegistrationCacheSvc.currentRegistration.needsAbK = newValue;
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
		$scope.tShirtSize = RegistrationCacheSvc.currentRegistration.tShirtSize;
		$scope.bandName = RegistrationCacheSvc.currentRegistration.bandName;
		$scope.instrument = RegistrationCacheSvc.currentRegistration.instrument;
		$scope.instrumentYears = RegistrationCacheSvc.currentRegistration.instrumentYears;
		$scope.nameContact1 = RegistrationCacheSvc.currentRegistration.nameContact1;
		$scope.telContact1 = RegistrationCacheSvc.currentRegistration.telContact1;
		$scope.nameContact2 = RegistrationCacheSvc.currentRegistration.nameContact2;
		$scope.telContact2 =  RegistrationCacheSvc.currentRegistration.telContact2;
		$scope.needsPreCare = RegistrationCacheSvc.currentRegistration.needsPreCare;
		$scope.hasDisability = RegistrationCacheSvc.currentRegistration.hasDisability;
		$scope.disabilityDescription = RegistrationCacheSvc.currentRegistration.disabilityDescription;
		$scope.needsAbK = RegistrationCacheSvc.currentRegistration.needsAbK;
		RegistrationCacheSvc.currentRegistration = undefined;
	}

	RegistrationSvc.findActivitiesByEventId($routeParams.eventId).then(function(response) {
		$scope.activities = response.data;
		// console.log($scope.activities);
	});

});
