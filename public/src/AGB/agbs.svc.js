var app = angular.module('js');

app.service('AgbsSvc', function($http) {
	this.find = function() {
		return $http.get('/api/agb');
	};

	this.update = function(agb) {
		return $http.put('/api/agb', agb);
	};
});
