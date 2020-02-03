var app = angular.module('js');

app.controller('RegistrationOwnEditCtrl', function($scope, $filter, $routeParams, $location, NotificationSvc, ActivitiesSvc, RegistrationSvc, conf, PlatformSvc) {

	//$scope.busyPromise = RegistrationSvc.findById;
	$scope.cities = PlatformSvc.getCities();
	$scope.platform = PlatformSvc;

	$scope.hasDisability = undefined;
	$scope.hasHealthIssues = undefined;

	$scope.setHasHealthIssues = function(b) { $scope.hasHealthIssues = b; }
	$scope.isHasHealthIssuesSet = function() { return $scope.hasHealthIssues !== undefined && $scope.hasHealthIssues !== null; }
	$scope.setHasDisability = function(b) { $scope.hasDisability = b; }
	$scope.isHasDisabilitySet = function() { return $scope.hasDisability !== undefined && $scope.hasDisability !== null; }

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
			$scope.registration.hasHealthIssues = $scope.hasHealthIssues;
			$scope.registration.healthAllergy = $scope.healthAllergy;
			$scope.registration.healthIncompatibility = $scope.healthIncompatibility;
			$scope.registration.healthIllnes = $scope.healthIllnes;
			$scope.registration.cityChild = $scope.cityChild;
			$scope.registration.hasDisability = $scope.hasDisability;
			$scope.registration.disabilityDescription = $scope.disabilityDescription;
			$scope.registration.diagnosticDescription = $scope.diagnosticDescription;
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
				$scope.addressChild = null;
				$scope.cityChild = null;
				$scope.hasHealthIssues = undefined;
				$scope.healthAllergy = null;
				$scope.healthIncompatibility = null;
				$scope.healthIllnes = null;
				$scope.hasDisability = undefined;
				$scope.disabilityDescription = null;
				$scope.diagnosticDescription = null;
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
		$scope.cityChild = registration.cityChild;
		$scope.hasHealthIssues = registration.hasHealthIssues;
		$scope.healthIncompatibility = registration.healthIncompatibility;
		$scope.healthAllergy = registration.healthAllergy;
		$scope.healthIllnes = registration.healthIllnes;
		$scope.hasDisability = registration.hasDisability;
		$scope.disabilityDescription = registration.disabilityDescription;
		$scope.diagnosticDescription = registration.diagnosticDescription;
		$scope.nameContact1 = registration.nameContact1;
		$scope.nameContact2 = registration.nameContact2;
		$scope.telContact1 = registration.telContact1;
		$scope.telContact2 = registration.telContact2;
		$scope.needsEbK = registration.needsEbK;
		$scope.canSwim = registration.canSwim;
		$scope.canGoHomeAllone = registration.canGoHomeAllone;
	});

});
