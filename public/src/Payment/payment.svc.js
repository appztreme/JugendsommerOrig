var app = angular.module('js');

app.service('PaymentSvc', function($http) {
    this.find = function() {
        return $http.get('/api/contact/payments');
    }
})