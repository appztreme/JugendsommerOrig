var app = angular.module('js');

/**
 * RegistrationSvc encapsulates service
 * communication with server
 */
app.service('RegistrationSvc', function($http) {
	this.find = function(eventId, activityId) {
        var path = '/api/registrations';
        if(!angular.isUndefined(activityId)) { path = path + '?activityId=' + activityId; }
				if(!angular.isUndefined(eventId) && angular.isUndefined(activityId)) { path = path + '?eventId=' + eventId; }
		return $http.get(path);
	};

	this.getSelectionParams = function() {
		return $http.get('/api/registrations/selectableEventActivities');
	};

	this.findById = function(registrationId) {
		return $http.get('/api/registrations/' + registrationId);
	};

	this.findByUser = function(userId) {
		return $http.get('/api/myRegistrations/' + userId);
	};

	this.delete = function(registrationId) {
		return $http.delete('/api/registrations/' + registrationId);
	};

	this.create = function(reg) {
		return $http.post('/api/registrations', reg);
	};

	this.update = function(reg) {
		return $http.put('/api/registrations', reg);
	};

	this.updateIsPaymentDone = function(registrationId, isPaymentDone) {
		console.log('IsPaymentDone', registrationId.toString() + ' ' + isPaymentDone);
	};

	this.updateIsEmailNotified = function(registrationId, isEmailNotified) {
		console.log('IsEmailNotified', registrationId.toString() + ' ' + isEmailNotified);
	}
});
