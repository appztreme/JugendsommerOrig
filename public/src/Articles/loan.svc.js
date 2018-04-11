var app = angular.module('js');

app.service('LoansSvc', function($http) {
	this.findByDateRange = function(from, to) {
        console.log("params", from, to);
        return $http.get('/api/loans/byDateRange/' + moment(from).format("YYYY-MM-DD") + '/' + moment(to).format("YYYY-MM-DD"));
    }

	this.create = function(articleName, location, lender, phoneNumber, from, to) {
        return $http.post('/api/loans', { articleName: articleName,
                                             location: location,
                                             lender: lender,
                                             phoneNumber: phoneNumber,
                                             from: from,
                                             to: to
                                            });	
	};

});