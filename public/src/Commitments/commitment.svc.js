var app = angular.module('js');

/**
 * CommitmentSvc encapsulates service
 * communication with server
 */
app.service('CommitmentSvc', function($http) {
	this.findByEventId = function(eventId) {
		return $http.get('/api/commitments' + eventId);
	};

	this.find = function() {
		return $http.get('/api/commitments');
	};

	this.getSelectionParams = function() {
		return $http.get('/api/commitments/selectableEvents');
	};

	this.getActivities = function(eventId) {
		return $http.get('/api/commitments/selectableActivities/' + eventId);
	}

	this.getAdminSummary = function() {
		return $http.get('/api/commitments/summary');
	};

	this.findById = function(commitmentId) {
		return $http.get('/api/commitments/' + commitmentId);
	};

	this.findByUser = function(userId) {
		return $http.get('/api/commitments/byUser/' + userId);
	};

	this.findByEvent = function(eventId) {
		return $http.get('/api/commitments/byEvent/' + eventId);
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

	this.updateIsCleared = function(id, isCleared) {
		return $http.put('/api/commitments/isCleared', { _id: id, isCleared: isCleared });
	};
});
