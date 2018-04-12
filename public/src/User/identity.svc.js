var app = angular.module('js');

app.factory('IdentitySvc', function() {

	return {
		currentUser: undefined,

		isAdmin:  function() {
			return !!this.currentUser && this.isAuthorized("admin"); // this.currentUser.roles.indexOf("admin") > -1;
		},

		isFAdmin: function() {
			return !!this.currentUser && this.isAuthorized("fadmin"); // this.currentUser.roles.indexOf("fadmin") > -1;
		},

		isAuthenticated: function() {
			return !!this.currentUser;
		},

		getPlainRoles: function(roles) {
			var r = [];
			for(var i=0; i<roles.length; i++) {
				var role = roles[i];
				if(typeof role === 'string' || role instanceof String) {
					r.push(role);
				} else {
					r.push(role.role);
				}
			}
			return r;
		},

		isAuthorized: function(role) {
			return !!this.currentUser && (this.getPlainRoles(this.currentUser.roles).indexOf(role) > -1);
		},

		checkEvent: function(roles, role, eventId, userEventId) {
			for(var i=0; i<roles.length; i++) {
				var r = roles[i];
				if(typeof r === 'string' || r instanceof String) {
					if(r === role && userEventId.toString() === eventId.toString()) return true;
				} else {
					if(r.role === role && r.areaId.toString() === eventId.toString()) return true;
				}
			}
		},

		checkLocation: function(roles, role, location, userLocation) {
			for(var i=0; i<roles.length; i++) {
				var r = roles[i];
				if(typeof r === 'string' || r instanceof String) {
					if(r === role && userLocation === location) return true;
				} else {
					if(r.role === role && r.areaName === location) return true;
				}
			}
		},

		isAuthorizedForEvent: function(role, eventId) {
			var check = this.isAuthorized(role) && this.checkEvent(this.currentUser.roles, role, eventId, this.currentUser.eventId);
				// this.currentUser.eventId && this.currentUser.eventId.toString() === eventId.toString();
			return check;
		},

		isAuthorizedForLocation: function(role, location) {
			var check = this.isAuthorized(role) && this.checkLocation(this.currentUser.roles, role, location, this.currentUser.location);
				// this.currentUser.location && this.currentUser.location === location;
			return check;
		}
	};
});
