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

	this.getCities = function() {
		return $http.get('/api/locations/cities');
	}

	this.getEventType = function(activityId) {
		return $http.get('/api/events/typeByActivity/' + activityId);
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
		var update = { _id: registrationId, isPaymentDone: isPaymentDone };
		return $http.put('/api/registrations/updateIsPaymentDone', update);
	};

	this.updateIsEmailNotified = function(registrationId, isEmailNotified) {
		var update = { _id: registrationId, isEmailNotified: isEmailNotified };
		return $http.put('/api/registrations/updateIsEmailNotified', update);
	}
});
