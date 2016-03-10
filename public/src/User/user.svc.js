var app = angular.module('js');

app.service('UserSvc', function($http) {
	this.create = function(firstName, lastName, userTel, userEmail, userName, pwd) {
		return $http.post('/api/user',{
			firstName: firstName,
		  lastName: lastName,
		  userTel: userTel,
	    userName: userName,
			userEmail: userEmail,
			pwd: pwd
		});
	};
});
