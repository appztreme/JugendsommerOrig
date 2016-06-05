var app = angular.module('js');

app.factory('IdentitySvc', function() {

	return {
		currentUser: undefined,

		isAdmin:  function() {
			return !!this.currentUser && this.currentUser.roles.indexOf("admin") > -1;
		},

		isFAdmin: function() {
			return !!this.currentUser && this.currentUser.roles.indexOf("fadmin") > -1;
		},

		isAuthenticated: function() {
			return !!this.currentUser;
		},

		isAuthorized: function(role) {
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		},

		isAuthorizedForEvent: function(role, eventId) {
			var check = this.isAuthorized(role) &&
				this.currentUser.eventId && this.currentUser.eventId.toString() === eventId.toString();
			console.log(check, this.currentUser, eventId);
			return check;
		},
	};
});
