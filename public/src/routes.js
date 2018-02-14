var app = angular.module('js');

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'GeoSelectionCtrl',
			templateUrl: '../templates/selection.html'
		})
		.when('/events/:location', {
			controller: 'EventsCtrl',
			templateUrl: '../templates/events.html'
		})
		.when('/info', {
			controller: 'InfoCtrl',
			templateUrl: '../templates/info/info.html'
		})
		.when('/report', {
			controller: 'ReportCtrl',
			templateUrl: '../templates/report.html'
		})
		.when('/myRegistrations', {
			controller: 'MyRegistrationsCtrl',
			templateUrl: '../templates/myRegistrations.html'
		})
		.when('/resources', {
			controller: 'ResourcesCtrl',
			templateUrl: '../templates/resources.html'
		})
		.when('/myCommitments', {
			controller: 'MyCommitmentsCtrl',
			templateUrl: '../templates/myCommitments.html'
		})
		.when('/newCommitment/:eventId', {
			controller: 'CommitmentNewCtrl',
			templateUrl: '../templates/commitmentEdit.html'
		})
		.when('/editCommitment/:commitmentId', {
			controller: 'CommitmentEditCtrl',
			templateUrl: '../templates/commitmentEdit.html'
		})
		.when('/newTravelExpenses/:eventId', {
			controller: 'TravelExpensesNewCtrl',
			templateUrl: '../templates/travelExpensesEdit.html'
		})
		.when('/editTravelExpenses/:commitmentId', {
			controller: 'TravelExpensesEditCtrl',
			templateUrl: '../templates/travelExpensesEdit.html'
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
		.when('/eventContacts/:eventId', {
			controller: 'EventContactCtrl',
			templateUrl: '../templates/eventContacts.html'
		})
		.when('/activityContacts/:activityId', {
			controller: 'ActivityContactCtrl',
			templateUrl: '../templates/activityContacts.html'
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
		.when('/eventRegistrations/:eventId', {
			controller: 'EventRegistrationCtrl',
			templateUrl: '../templates/eventRegistration.html'
		})
		.when('/registration/:eventId', {
			controller: 'RegistrationCtrl',
			templateUrl: '../templates/registration/registration.html'
		})
		.when('/editRegistration/:registrationId', {
			controller: 'RegistrationEditCtrl',
			templateUrl: '../templates/registration/registrationEdit.html'
		})
		.when('/editOwnRegistration/:registrationId', {
			controller: 'RegistrationOwnEditCtrl',
			templateUrl: '../templates/registration/registrationOwnEdit.html'
		})
		.when('/login', {
			controller: 'LoginCtrl',
			templateUrl: '../templates/login.html'
		})
		.when('/lang', {
			controller: 'LangCtrl',
			templateUrl: '../templates/lang.html'
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
		.when('/userRolesSearch', {
			controller: 'UserRolesSearchCtrl',
			templateUrl: '../templates/userRolesSearch.html'
		})
		.when('/userRolesUpdate/:userId', {
			controller: 'UserRolesUpdateCtrl',
			templateUrl: '../templates/userRolesUpdate.html'
		})
		.when('/newLending/:eventId', {
			controller: 'LendingNewCtrl',
			templateUrl: '../templates/lendingNew.html'
		})
		.when('/payment', {
			controller: 'PaymentCtrl',
			templateUrl: '../templates/payment.html'
		})
		.when('/agb/:eventId', {
			controller: 'AgbEditCtrl',
			templateUrl: '../templates/agbEdit.html'
		});
});
