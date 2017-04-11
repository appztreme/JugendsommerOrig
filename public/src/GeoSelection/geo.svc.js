var app = angular.module('js');

app.service('GeoSvc', function($http) {
	var EVENT_SVC_PATH = '/api/events/';

    this.getSelection = function() {
        return $http.get(EVENT_SVC_PATH + 'selection');
    }

	this.getSelectionAdmin = function() {
        return $http.get(EVENT_SVC_PATH + 'asAdmin/selection');
    }

	this.getSummerSelection = function() {
		return $http.get(EVENT_SVC_PATH + 'selection/summer');
	}

	this.getSummerSelectionAdmin = function() {
		return $http.get(EVENT_SVC_PATH + 'asAdmin/selection/summer');
	}

	this.getTypeSelection = function() {
		return $http.get(EVENT_SVC_PATH + 'selection/type');
	}

	this.getTypeSelectionAdmin = function() {
		return $http.get(EVENT_SVC_PATH + 'asAdmin/selection/type');
	}
})
