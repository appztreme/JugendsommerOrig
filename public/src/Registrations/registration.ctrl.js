var app = angular.module('js');

app.controller('RegistrationCtrl', function($scope, $routeParams, $filter, $location, NotificationSvc, RegistrationSvc, RegistrationCacheSvc, IdentitySvc) {
	RegistrationSvc.activityId = $routeParams.activityId;
	$scope.activityId = $routeParams.activityId;

	$scope.statusBirthday = { open: false }
	$scope.openBirthday = function($event) { $scope.statusBirthday.open = true; }

	$scope.busyPromise = RegistrationSvc.create();

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
		$scope.nameContact1 = RegistrationCacheSvc.currentRegistration.nameContact1;
		$scope.telContact1 = RegistrationCacheSvc.currentRegistration.telContact1;
		$scope.nameContact2 = RegistrationCacheSvc.currentRegistration.nameContact2;
		$scope.telContact2 =  RegistrationCacheSvc.currentRegistration.telContact2;
		RegistrationCacheSvc.currentRegistration = undefined;
	}
});
