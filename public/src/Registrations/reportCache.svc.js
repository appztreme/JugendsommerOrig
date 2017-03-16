var app = angular.module('js');

app.service('ReportCacheSvc', function() {

	this.isNotEmptyCache = function() {
		return !angular.isUndefined(this.currentEventIdFilter) &&
					 !angular.isUndefined(this.currentActivityIdFilter);
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

  this.hasLastVerticalScrollPosition = function() {
    return !angular.isUndefined(this.lastVerticalScrollPosition);
  }

	this.currentActivityIdFilter = undefined;
  this.currentEventIdFilter = undefined;

  this.events = undefined;
  this.allActivities = undefined;

  this.lastVerticalScrollPosition = undefined;
});
