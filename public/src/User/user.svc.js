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
	this.updatePassword = function(userName, userToken, newPassword) {
		return $http.post('/api/user/updatePwd', {
			userName: userName,
			userToken: userToken,
			password: newPassword
		});
	};
	this.sendUserTokenMail = function(userName) {
		return $http.post('/api/user/requestUserToken', {
			userName: userName
		});
	};
});
