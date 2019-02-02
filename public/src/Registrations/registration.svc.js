var app = angular.module('js');

/**
 * RegistrationSvc encapsulates service
 * communication with server
 */
app.service('RegistrationSvc', function($http) {
	this.find = function(eventId, activityId, year, name, firstname, receiptNr) {
        var path = '/api/registrations';
		var params = {};
		if(!angular.isUndefined(eventId) && angular.isUndefined(activityId)) params.eventId = eventId;
		if(!angular.isUndefined(activityId)) params.activityId = activityId;
		if(!angular.isUndefined(year)) params.year = year;
		if(!angular.isUndefined(name)) params.name = name;
		if(!angular.isUndefined(firstname)) params.firstname = firstname;
		if(!angular.isUndefined(receiptNr)) params.receiptNumber = receiptNr;
		return $http.get(path, { params: params });
	};

	this.findActivitiesByEventId = function(eventId) {
		return $http.get('/api/activities', { params: { eventId: eventId }});
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
		return $http.patch('/api/registrations/updateIsPaymentDone', update);
	};

	this.updateIsEmailNotified = function(registrationId, isEmailNotified) {
		var update = { _id: registrationId, isEmailNotified: isEmailNotified };
		return $http.patch('/api/registrations/updateIsEmailNotified', update);
	}

	this.updateProp = function(registrationId, propertyName, value) {
		var update = { _id: registrationId, property: propertyName, value: value };
		return $http.patch('/api/registrations/updateProp', update);
	}
});
