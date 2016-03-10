var app = angular.module('js');

app.service('RegistrationCacheSvc', function() {

	this.isNotEmptyCache = function() {
		return !angular.isUndefined(this.lastRegistration);
	};

	this.lastRegistration = undefined;

	this.hasCurrentRegistration = function() {
		return !angular.isUndefined(this.currentRegistration);
	};

	this.currentRegistration = undefined;

});
