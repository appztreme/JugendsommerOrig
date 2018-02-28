var app = angular.module('js');

app.controller('RegistrationOwnEditCtrl', function($scope, $filter, $routeParams, $location, NotificationSvc, ActivitiesSvc, RegistrationSvc, conf, PlatformSvc) {

	//$scope.busyPromise = RegistrationSvc.findById;
	$scope.cities = PlatformSvc.getCities();

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
	});

});
