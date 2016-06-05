var app = angular.module('js');

app.service('MyCommitmentsCacheSvc', function() {
  this.currentEventIdFilter = undefined;

  this.hasEventFilterParameter = function() {
		return !angular.isUndefined(this.currentEventIdFilter);
	};
});
