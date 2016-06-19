var app = angular.module('js');

app.service('LendingSvc', function($http) {
	this.findByUser = function(userId) {
		return $http.get('/api/lendings/user/', { params: { userId: userId}});
	};

	this.getTypes = function() {
		return $http.get('/api/resources/types');
	};

	this.create = function(lending) {
		return $http.post('/api/lendings', lending);
	};
});
