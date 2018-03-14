var app = angular.module('js');

app.controller('RegistrationOwnEditCtrl', function($scope, $filter, $routeParams, $location, NotificationSvc, ActivitiesSvc, RegistrationSvc, conf, PlatformSvc) {

	//$scope.busyPromise = RegistrationSvc.findById;
	$scope.cities = PlatformSvc.getCities();
	$scope.platform = PlatformSvc;

	$scope.save = function() {
		if($scope.registrationForm.$valid) {
			$scope.registration.firstNameParent = $scope.firstNameParent;
			$scope.registration.lastNameParent = $scope.lastNameParent;
			$scope.registration.phoneNumberParent = $scope.phoneNumberParent;
			$scope.registration.emailParent = $scope.emailParent;
			$scope.registration.firstNameChild = $scope.firstNameChild;
			$scope.registration.lastNameChild = $scope.lastNameChild;
			$scope.registration.birthdayChild = $scope.birthdayChild;
			$scope.registration.schoolChild = $scope.schoolChild;
			$scope.registration.healthChild = $scope.healthChild;
			$scope.registration.addressChild = $scope.addressChild;
			$scope.registration.cityChild = $scope.cityChild;
			$scope.registration.hasDisability = $scope.hasDisability;
			$scope.registration.disabilityDescription = $scope.disabilityDescription;
			$scope.registration.nameContact1 = $scope.nameContact1;
			$scope.registration.nameContact2 = $scope.nameContact2;
			$scope.registration.telContact1 = $scope.telContact1;
			$scope.registration.telContact2 = $scope.telContact2;
			$scope.registration.needsEbK = $scope.needsEbK;
			$scope.registration.canSwim = $scope.canSwim;
			$scope.registration.canGoHomeAllone = $scope.canGoHomeAllone;
			RegistrationSvc.update( $scope.registration
			).success(function(reg) {
				$scope.firstNameParent = null;
				$scope.lastNameParent = null;
				$scope.emailParent = null;
				$scope.phoneNumberParent = null;
				$scope.firstNameChild = null;
				$scope.lastNameChild = null;
				$scope.birthdayChild = null;
				$scope.schoolChild = null;
				$scope.healthChild = null;
				$scope.addressChild = null;
				$scope.cityChild = null;
				$scope.hasDisability = false;
				$scope.disabilityDescription = null;
				$scope.nameContact1 = null;
				$scope.nameContact2 = null;
				$scope.telContact1 = null;
				$scope.telContact2 = null;
				$scope.needsEbK = false;
				$scope.canSwim = false;
				$scope.canGoHomeAllone = false;
			})
			.then(function() {
				NotificationSvc.notify('Aenderungen erfolgreich gespeichert');
				$location.path('/myRegistrations');
			});
		}
	}

	RegistrationSvc.findById($routeParams.registrationId).success(function(registration) {
		$scope.registration = registration;
		$scope.firstNameParent = registration.firstNameParent;
		$scope.lastNameParent =  registration.lastNameParent;
		$scope.phoneNumberParent = registration.phoneNumberParent;
		$scope.emailParent = registration.emailParent;
		$scope.firstNameChild = registration.firstNameChild;
		$scope.lastNameChild = registration.lastNameChild;
		$scope.birthdayChild = $filter('date')(new Date(registration.birthdayChild), 'yyyy-MM-dd');
		$scope.schoolChild = registration.schoolChild;
		$scope.healthChild = registration.healthChild;
		$scope.addressChild = registration.addressChild;
		$scope.cityChild = registration.cityChild;
		$scope.hasDisability = registration.hasDisability;
		$scope.disabilityDescription = registration.disabilityDescription;
		$scope.nameContact1 = registration.nameContact1;
		$scope.nameContact2 = registration.nameContact2;
		$scope.telContact1 = registration.telContact1;
		$scope.telContact2 = registration.telContact2;
		$scope.needsEbK = registration.needsEbK;
		$scope.canSwim = registration.canSwim;
		$scope.canGoHomeAllone = registration.canGoHomeAllone;
	});

});
