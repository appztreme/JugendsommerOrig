var app = angular.module('js');

/**
 * RegistrationSvc encapsulates service
 * communication with server
 */
app.service('RegistrationSvc', function($http) {
	this.find = function() {
		return $http.get('/api/registrations');
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
});
