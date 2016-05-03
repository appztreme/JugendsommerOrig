var app = angular.module('js');

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'EventsCtrl',
			templateUrl: '../templates/events.html'
		})
		.when('/info', {
			controller: 'InfoCtrl',
			templateUrl: '../templates/info.html'
		})
		.when('/report', {
			controller: 'ReportCtrl',
			templateUrl: '../templates/report.html'
		})
		.when('/myRegistrations', {
			controller: 'MyRegistrationsCtrl',
			templateUrl: '../templates/myRegistrations.html'
		})
		.when('/myCommitments', {
			controller: 'MyCommitmentsCtrl',
			templateUrl: '../templates/myCommitments.html'
		})
		.when('/newCommitment', {
			controller: 'CommitmentNewCtrl',
			templateUrl: '../templates/commitmentEdit.html'
		})
		.when('/editCommitment', {
			controller: 'CommitmentEditCtrl',
			templateUrl: '../templates/commitmentEdit.html'
		})
		.when('/newEvent', {
			controller: 'EventNewCtrl',
			templateUrl: '../templates/eventEdit.html'
		})
		.when('/editEvent/:eventId', {
			controller: 'EventEditCtrl',
			templateUrl: '../templates/eventEdit.html'
		})
		.when('/eventInfo/:eventId', {
			controller: 'EventInfoCtrl',
			templateUrl: '../templates/eventInfo.html'
		})
		.when('/activities/:eventId', {
			controller: 'ActivitiesCtrl',
			templateUrl: '../templates/activities.html'
		})
		.when('/newActivity', {
			controller: 'ActivityNewCtrl',
			templateUrl: '../templates/activityEdit.html'
		})
		.when('/editActivity/:activityId', {
			controller: 'ActivityEditCtrl',
			templateUrl: '../templates/activityEdit.html'
		})
		.when('/registration/:activityId', {
			controller: 'RegistrationCtrl',
			templateUrl: '../templates/registration.html'
		})
		.when('/editRegistration/:registrationId', {
			controller: 'RegistrationEditCtrl',
			templateUrl: '../templates/registrationEdit.html'
		})
		.when('/login', {
			controller: 'LoginCtrl',
			templateUrl: '../templates/login.html'
		})
		.when('/user', {
			controller: 'UserNewCtrl',
			templateUrl: '../templates/userNew.html'
		})
		.when('/userToken', {
			controller: 'UserTokenRequestCtrl',
			templateUrl: '../templates/userTokenRequest.html'
		})
		.when('/userNewPwd', {
			controller: 'UserUpdatePwdCtrl',
			templateUrl: '../templates/userUpdatePwd.html'
		})
		.when('/agb/:activityId', {
			controller: 'AgbEditCtrl',
			templateUrl: '../templates/agbEdit.html'
		});
});
