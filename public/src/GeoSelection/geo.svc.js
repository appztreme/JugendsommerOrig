var app = angular.module('js');

app.service('GeoSvc', function($http) {
	var EVENT_SVC_PATH = '/api/events/';

    this.getSelection = function() {
        return $http.get(EVENT_SVC_PATH + 'selection');
    }

	this.getSummerSelection = function() {
		return $http.get(EVENT_SVC_PATH + 'selection/summer');
	}

	this.getTypeSelection = function() {
		return $http.get(EVENT_SVC_PATH + 'selection/type');
	}
})
