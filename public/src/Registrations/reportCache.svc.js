var app = angular.module('js');

app.service('ReportCacheSvc', function() {

	this.isNotEmptyCache = function() {
		return !angular.isUndefined(this.lastEventIdFilter);
	};

	this.hasEventFilterParameter = function() {
		return !angular.isUndefined(this.currentEventIdFilter);
	};

  this.hasActivityFilterParameter = function() {
    return !angular.isUndefined(this.currentActivityIdFilter);
  };

  this.hasSelectionData = function() {
      return !angular.isUndefined(this.events) &&
             !angular.isUndefined(this.allActivities);
  };

  this.lastActivityIdFilter = undefined;
  this.lastEventIdFilter = undefined;

	this.currentActivityIdFilter = undefined;
  this.currentEventIdFilter = undefined;

  this.events = undefined;
  this.allActivities = undefined;
});
