var app = angular.module('js', ['ngRoute','ngResource','cgBusy', 'ngComboDatePicker','jkuri.datepicker','pascalprecht.translate','angular-szn-autocomplete', 'ngFileSaver']);

var env = {};
// Import variables if present (from env.js)
if(window) env = window.__env;
app.constant('conf', env);

app.config(['$routeProvider', '$httpProvider', '$translateProvider', 'conf', function($routeProvider, $httpProvider, $translateProvider, conf) {
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    $translateProvider.translations('de', conf.translations.de);
    $translateProvider.translations('it', conf.translations.it);
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('de');
}]);
