var app = angular.module('js');

/**
 * CommitmentSvc encapsulates service
 * communication with server
 */
app.service('CommitmentSvc', function($http) {
	this.find = function(eventId) {
		return $http.get('/api/commitments' + eventId);
	};

	this.getSelectionParams = function() {
		return $http.get('/api/registrations/selectableEventActivities');
	};

	this.findById = function(commitmentId) {
		return $http.get('/api/commitments/' + commitmentId);
	};

	this.findByUser = function(userId) {
		return $http.get('/api/commitments/byUser/' + userId);
	};

	this.delete = function(commitmentId) {
		return $http.delete('/api/commitments/' + commitmentId);
	};

	this.create = function(com) {
		return $http.post('/api/commitments', com);
	};

	this.update = function(com) {
		return $http.put('/api/commitments', com);
	};
});
