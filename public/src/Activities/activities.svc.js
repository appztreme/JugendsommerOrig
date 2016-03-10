var app = angular.module('js');

app.service('ActivitiesSvc', function($http) {
	this.findByEventId = function(eventId) {
		return $http.get('/api/activities', { params: { eventId: eventId }});
	};

	this.findAllSiblingsByActivityId = function(activityId) {
		return $http.get('/api/activities', { params: { activityId: activityId }});
	};

	this.findById = function(activityId) {
		return $http.get('/api/activities/' + activityId);
	};

	this.create = function(activity) {
		return $http.post('/api/activities', activity);	
	};

	this.update = function(activity) {
		return $http.put('/api/activities', activity);
	};
});
