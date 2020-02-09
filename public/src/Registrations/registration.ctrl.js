var app = angular.module('js');

app.controller('RegistrationCtrl', function($scope, $routeParams, $filter, $location, NotificationSvc, RegistrationSvc, RegistrationCacheSvc, IdentitySvc, conf, $rootScope, $translate, PlatformSvc) {
	RegistrationSvc.eventId = $routeParams.eventId;
	$scope.eventId = $routeParams.eventId;

	$scope.acceptAGB = false;
	$scope.acceptInsurance = false;
	$scope.acceptPrivacy = false;
	$scope.acceptHealth = false;
	$scope.currentState = 1;
	$scope.selectedActivities = [];
	$scope.emailParentCheck = '';
	$scope.disabledForSibling = false;
	$scope.platform = PlatformSvc;

	$scope.agbVisibility = false;
	$scope.insuranceVisibility = false;
	$scope.privacyVisibility = false;
	$scope.mediaVisibility = false;
	$scope.healthVisibility = false,
	$scope.swimInfoVisible = false;
	$scope.ebkInfoVisible = false;

	$scope.toggleAgb = function() { $scope.agbVisibility = !$scope.agbVisibility; }
	$scope.togglePrivacy = function() { $scope.privacyVisibility = !$scope.privacyVisibility; }
	$scope.toggleInsurance = function() { $scope.insuranceVisibility = !$scope.insuranceVisibility; }
	$scope.toggleMedia = function() { $scope.mediaVisibility = !$scope.mediaVisibility; }
	$scope.toggleHealth = function() { $scope.healthVisibility = !$scope.healthVisibility; }
	$scope.toggleSwimInfo = function() { $scope.swimInfoVisible = !$scope.swimInfoVisible; }
	$scope.toggleebkInfo = function() { $scope.ebkInfoVisible = !$scope.ebkInfoVisible; }

	$scope.setHasHealthIssues = function(b) { $scope.hasHealthIssues = b; }
	$scope.isHasHealthIssuesSet = function() { return $scope.hasHealthIssues !== undefined && $scope.hasHealthIssues !== null; }
	$scope.setHasDisability = function(b) { $scope.hasDisability = b; }
	$scope.isHasDisabilitySet = function() { return $scope.hasDisability !== undefined && $scope.hasDisability !== null; }
	$scope.setHasOwnEBike = function(b) { $scope.hasOwnEBike = b; }
	$scope.isHasOwnEBikeSet = function() { return $scope.hasOwnEBike !== undefined && $scope.hasOwnEBike !== null; }
	$scope.isOtherCityVisible = function() {
		if($scope.cityChild === "Andere" || $scope.cityChild === "Altri") {
			return true;
		} else {
			$scope.cityChildOther = undefined;
			return false;
		}
	}

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
	$scope.msgError = 'Bei Ihrer Anmeldung ist ein Problem aufgetreten'

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();

		$translate(['RESERVATION.MSG_SUCCESS', 'RESERVATION.MSG_NO_DUPLICATES'])
			.then(function (translations) {
    			$scope.msgSuccess = translations['RESERVATION.MSG_SUCCESS'];
				$scope.msgNoDuplicates = translations['RESERVATION.MSG_NO_DUPLICATES'];
				$scope.msgError = translations['RESERVATION.MSG_ERROR'];
  			}, function (translationIds) {
				$scope.msgSuccess = translationIds.reservation_msg_success;
				$scope.msgNoDuplicates = translationIds.reservation_msg_no_duplicates;
				$scope.msgError = translationIds.reservation_msg_error;
  			});
    });

	// $scope.busyPromise = RegistrationSvc.create();

	$scope.type = $routeParams.type;
	$scope.cities = PlatformSvc.getCities();
	$scope.tShirtSizes = conf.tSizes;
	$scope.schoolLevels = conf.schoolLevels;
	$scope.cityChild = PlatformSvc.getDefaultCity();
	$scope.addressChild = " ";
	$scope.needsPreCare = false;
	$scope.needsAbK = true;
	$scope.canSwim = false;
	$scope.canGoHomeAllone = false;
	$scope.hasDisability = undefined;
	$scope.hasHealthIssues = undefined;
	if($scope.platform.isJDUL()) {
		$scope.hasHealthIssues = true;
		$scope.hasDisability = true;
	}
	$scope.isSiblingReservation = false;
	$scope.acceptsOptionalFee = false;
	$scope.acceptsNewsletter = false;
	$scope.diagnosticDescription = null;
	$scope.acceptsMediaPublication = false;
	$scope.hasOwnEBike = undefined;

	$scope.isEmailEqual = function() {
		if($scope.emailParent === '' || !$scope.emailParent || !$scope.emailParentCheck || $scope.emailParentCheck === '') return false;
		if($scope.emailParent === $scope.emailParentCheck) return true;
		return false;
	}

	$scope.canReserve = function(activity) {
		if(IdentitySvc.isAdmin()) return true;
        return activity.curParticipants < activity.maxParticipants;
    };

    $scope.canQueue = function(activity) {
        return activity.curParticipants >= activity.maxParticipants &&
               activity.curParticipants < (activity.maxParticipants + activity.queueSize);
    };

    $scope.canNotReserve = function(activity) {
		if(IdentitySvc.isAdmin()) return false;
        return activity.curParticipants >= (activity.maxParticipants + activity.queueSize);
	};
	
	$scope.getCountObj = function(activity) {
		return { count: activity.maxParticipants };
	}

	$scope.isChildDataComplete = function() {
		return $scope.registrationForm.$valid && $scope.isEmailEqual() && $scope.isHasHealthIssuesSet() && $scope.isHasDisabilitySet();
	}

	$scope.isActivityDataComplete = function() {
		return $scope.selectedActivities && $scope.selectedActivities.length > 0;
	}

	$scope.isRegistrationAllowed = function() {
		if($scope.platform.isJDUL())
			return $scope.registrationForm.$valid && $scope.acceptAGB && $scope.acceptsMediaPublication && $scope.acceptHealth && $scope.acceptInsurance;
		else if($scope.platform.isKiso() || $scope.platform.isTest())
			return $scope.registrationForm.$valid && $scope.acceptAGB && $scope.acceptPrivacy;
		else if($scope.platform.isJugendsommer() || $scope.platform.isJDBL())
			return $scope.registrationForm.$valid && $scope.acceptAGB && $scope.acceptHealth;
		else
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
			$scope.birthdayChild = new Date(RegistrationCacheSvc.lastRegistration.birthdayChild);
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
			//$scope.hasDisability = RegistrationCacheSvc.lastRegistration.hasDisability;
			$scope.disabilityDescription = RegistrationCacheSvc.lastRegistration.disabilityDescription;
			$scope.canSwim = RegistrationCacheSvc.lastRegistration.canSwim;
			$scope.canGoHomeAllone = RegistrationCacheSvc.lastRegistration.canGoHomeAllone;
			//$scope.needsEbK = RegistrationSvc.lastRegistration.needsEbK;
		}
	};

	$scope.updateSiblingFromCache = function() {
		$scope.updateFromCache();
		$scope.firstNameChild = null;
		$scope.isSiblingReservation = true;
		$scope.disabledForSibling = true;
		$scope.birthdayChild = null;
		$scope.schoolChild = null;
		$scope.healthChild = null;
		$scope.hasHealthIssues = undefined;
		$scope.hasDisability = undefined;
		if($scope.platform.isJDUL()) {
			$scope.hasHealthIssues = true;
			$scope.hasDisability = true;
		}
		$scope.hasOwnEBike = undefined;
		$scope.heightChild = false;
		$scope.healthIncompatibility = null;
		$scope.healthAllergy = null;
		$scope.healthIllnes = null;
		$scope.diagnosticDescription = null;
	}

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
				cityChild: $scope.cityChildOther ? $scope.cityChildOther : $scope.cityChild,
				tShirtSize: $scope.tShirtSize,
				hasOwnEBike: $scope.hasOwnEBike,
				heightChild: $scope.heightChild,
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
				hasHealthIssues: $scope.hasHealthIssues,
				healthIncompatibility: $scope.healthIncompatibility,
				healthAllergy: $scope.healthAllergy,
				healthIllnes: $scope.healthIllnes,
				hasDisability: $scope.hasDisability,
				disabilityDescription: $scope.disabilityDescription,
				diagnosticDescription: $scope.diagnosticDescription,
				needsEbK: $scope.needsEbK,
				canSwim: $scope.canSwim,
				canGoHomeAllone: $scope.canGoHomeAllone,
				isSiblingReservation: $scope.isSiblingReservation,
				acceptsOptionalFee: $scope.acceptsOptionalFee,
				acceptsMediaPublication: $scope.acceptsMediaPublication,
				acceptsNewsletter: $scope.acceptsNewsletter,
				type: $scope.type
			})
			.error(function(err) {
				if(err.indexOf('duplicate key error index') > -1) {
					NotificationSvc.warn($scope.msgNoDuplicates);
				} else {
					NotificationSvc.warn($scope.error);
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
				$scope.hasHealthIssues = undefined;
				$scope.hasDisability = undefined;
				if($scope.platform.isJDUL()) {
					$scope.hasHealthIssues = true;
					$scope.hasDisability = true;
				}
				$scope.healthAllergy = null;
				$scope.healthIncompatibility = null;
				$scope.healthIllnes = null;
				$scope.disabilityDescription = null;
				$scope.diagnosticDescription = null;
				$scope.needsEbK = true;
				$scope.hasOwnEBike = undefined;
				$scope.heightChild = 0;
				$scope.canSwim = false;
				$scope.acceptsOptionalFee = false;
				$scope.acceptsMediaPublication = false;
				$scope.acceptsNewsletter = false;
				$scope.isSiblingReservation = false;
				$scope.canGoHomeAllone = false;
				$scope.selectedActivities = [];
				$scope.currentState = 1;
				RegistrationCacheSvc.lastRegistration = reg[0];
				RegistrationCacheSvc.currentRegistration = undefined;
				// console.log("last", RegistrationCacheSvc.lastRegistration, reg)
			}).then(function() {
				NotificationSvc.notify($scope.msgSuccess);
				$location.path('/');
			});
		}
	};

	RegistrationSvc.findActivitiesByEventId($routeParams.eventId).then(function(response) {
		$scope.activities = response.data;
		// console.log($scope.activities);
	});

});
