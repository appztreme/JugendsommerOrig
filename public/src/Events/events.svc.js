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

	this.getSelectionParams = function() {
		return $http.get('/api/registrations/selectableEventActivities');
	};

	this.getContacts = function(eventId) {
		return $http.get(EVENT_SVC_PATH + 'contacts/' + eventId);
	}

	this.findRegistrations = function(activityId, eventId) {
        var path = '/api/registrations';
		var params = {};
		if(!angular.isUndefined(eventId) && angular.isUndefined(activityId)) params.eventId = eventId;
		if(!angular.isUndefined(activityId)) params.activityId = activityId;
		params.year = (new Date()).getFullYear();
		return $http.get(path, { params: params });
	};

	this.findByLocation = function(loc) {
		return $http.get(EVENT_SVC_PATH + 'location/' + loc);
	}

	this.findByType = function(type) {
		return $http.get(EVENT_SVC_PATH + 'type/' + type);
	}

	this.findBySummerLocation = function(loc) {
		return $http.get(EVENT_SVC_PATH + 'location/summer/' + loc);
	}

	this.findByLocationAsAdmin = function(loc) {
		return $http.get(EVENT_SVC_PATH + 'asAdmin/location/' + loc);
	}

	this.findByTypeAsAdmin = function(type) {
		return $http.get(EVENT_SVC_PATH + 'asAdmin/type/' + type);
	}

	this.findBySummerLocationAsAdmin = function(loc) {
		return $http.get(EVENT_SVC_PATH + 'asAdmin/location/summer/' + loc);
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
