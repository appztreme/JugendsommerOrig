var app = angular.module('js');

app.factory('IdentitySvc', function() {

	return {
		currentUser: undefined,
		
		isAdmin:  function() {
			return !!this.currentUser && this.currentUser.roles.indexOf("admin") > -1;
		},

		isAuthenticated: function() {
			return !!this.currentUser;
		},

		isAuthorized: function(role) {
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		}
	};
});
