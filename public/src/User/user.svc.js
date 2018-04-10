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
	this.getLocations = function() {
		return $http.get('/api/locations/events');
	};
	this.getEvents = function() {
		return $http.get('/api/events');
	};
	this.findById = function(id) {
		return $http.get('/api/user/' + id);
	};
	this.search = function(term) {
		return $http.get('/api/user/search/' + term);
	};

	this.deleteRole = function(id, role, areaId, areaName){
		return $http.post('/api/user/deleteRole', {
			id: id,
			role: role,
			areaId: areaId,
			areaName: areaName
		});
	};

	this.updateRoles = function(id, role, areaId, areaName) {
		return $http.post('/api/user/updateRoles', {
			id: id,
			role: role,
			areaId: areaId,
			areaName: areaName
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
