var app = angular.module('js');

app.service('RegistrationCacheSvc', function() {

	this.isNotEmptyCache = function() {
		return !angular.isUndefined(this.lastRegistration);
	};

	this.lastRegistration = undefined;

	this.hasCurrentRegistration = function() {
		return !angular.isUndefined(this.currentRegistration) && 
			   !angular.isUndefined(this.currentRegistration.firstNameChild) &&
			   !angular.isUndefined(this.currentRegistration.lastNameChild) &&
			   !angular.isUndefined(this.currentRegistration.firstNameParent) && 
			   !angular.isUndefined(this.currentRegistration.lastNameParent);
	};

	this.currentRegistration = undefined;

});
