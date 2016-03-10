var app = angular.module('js');

app.factory('AuthenticationSvc', function($http, $q, NotificationSvc, IdentitySvc) {
    var authenticationService = {};

    authenticationService.signin = function(username, password) {
	var deferred = $q.defer();
	$http.post('/api/login', { username: username, password: password }).then(function(response) {
		if(response.data.success) {
            		IdentitySvc.currentUser = response.data.user;
			deferred.resolve(true);
		} else {
			deferred.resolve(false);
		}
	});
	return deferred.promise;
    };

    authenticationService.signout = function() {
	var deferred = $q.defer();
	$http.post('/api/logout', { logout: true }).then(function() {
		IdentitySvc.currentUser = undefined;
		deferred.resolve();
	});
	return deferred.promise;
    };

    return authenticationService;
});
