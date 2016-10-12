var app = angular.module('js');

/**
 * EventSvc encapsulates server communication
 */
app.service('EventsSvc', function($http) {
	var EVENT_SVC_PATH = '/api/events/';

	var filter = undefined;

	this.getUpdatedFilter = function(f) {
		if(f) { filter = f; }
		return filter;
	};

	this.find = function() {
		return $http.get(EVENT_SVC_PATH);
	};

	this.findByType = function(type) {
		return $http.get(EVENT_SVC_PATH + 'type/' + type);
	}

	this.findAsAdmin = function() {
		return $http.get(EVENT_SVC_PATH + 'asAdmin');
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
