var app = angular.module('js', ['ngRoute','ngResource','cgBusy','jkuri.datepicker','pascalprecht.translate']);

app.config(['$routeProvider', '$httpProvider', '$translateProvider', function($routeProvider, $httpProvider, $translateProvider) {
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    $translateProvider.translations('de', {
        NAV: {
            INFO: 'Info',
            PROGRAM: 'Programm',
            MYRES: 'Meine Reservierungen',
            MYCOMMITS: 'Meine Rechnungen',
            REPORT: 'Report',
            LENDINGS: 'Material'
        },
        LOGIN: {
            USER: 'User',
            PWD: 'Passwort',
            LOGIN: 'Anmelden',
            NEW: 'Neuer User',
            PWDNEW: 'Passort vergessen'
        }
    });

    $translateProvider.translations('it', {
        NAV: {
            INFO: 'it_Info',
            PROGRAM: 'it_InfoProgramm',
            MYRES: '_itMeine Reservierungen',
            MYCOMMITS: '_itMeine Rechnungen',
            REPORT: 'it_Report',
            LENDINGS: '_itMaterial'
        },
        LOGIN: {
            USER: 'User',
            PWD: 'Passwort',
            LOGIN: 'Anmelden',
            NEW: 'Neuer User',
            PWDNEW: 'Passort vergessen'
        }
    });
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('de');
}]);
