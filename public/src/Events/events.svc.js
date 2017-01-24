var app = angular.module('js');

/**
 * EventSvc encapsulates server communication
 */
app.service('EventsSvc', function($http) {
	var EVENT_SVC_PATH = '/api/events/';

	this.getLocations = function() {
		return $http.get('/api/locations/events');
	}

	this.find = function() {
		return $http.get(EVENT_SVC_PATH);
	};

	this.findByLocation = function(loc) {
		return $http.get(EVENT_SVC_PATH + 'location/' + loc);
	}

	this.findByType = function(type) {
		return $http.get(EVENT_SVC_PATH + 'type/' + type);
	}

	this.findAsAdmin = function(loc) {
		return $http.get(EVENT_SVC_PATH + 'asAdmin/location/' + loc);
	}

	this.findById = function(eventId) {
		return $http.get(EVENT_SVC_PATH + eventId);
	};

	this.create = function(ev) {
		return $http.post(EVENT_SVC_PATH, ev);
	};

	this.update = function(ev) {
		return $http.put(EVENT_SVC_PATH, ev);
	};
});
