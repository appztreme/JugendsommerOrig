var app = angular.module('js');

app.service('LoansSvc', function($http) {
	this.findByDateRange = function(from, to, articleId, location, lender) {
        var path = '/api/loans/search/';
        var params = {};
        if(!angular.isUndefined(from)) params.from = moment(from).format("YYYY-MM-DD");
        if(!angular.isUndefined(to)) params.to = moment(to).format("YYYY-MM-DD");
        if(!angular.isUndefined(articleId)) params.articleId = articleId;
        if(!angular.isUndefined(location)) params.location = location;
        if(!angular.isUndefined(lender)) params.lender = lender;
        // console.log("p", params, location, lender);
        return $http.get(path, { params: params });
    }

	this.create = function(articleName, location, lender, phoneNumber, from, to, start, destination, startTime, endTime, participants) {
        return $http.post('/api/loans', { articleName: articleName,
                                             location: location,
                                             lender: lender,
                                             phoneNumber: phoneNumber,
                                             from: from,
                                             to: to,
                                             start: start,
                                             destination: destination,
                                             startTime: startTime,
                                             endTime: endTime,
                                             participants: participants
                                            });
	};

    this.createById = function(articleId, lender, phoneNumber, from, to, maxDuration) {
        return $http.post('/api/loans/byId', { articleId: articleId,
                                             lender: lender,
                                             phoneNumber: phoneNumber,
                                             from: from,
                                             to: to,
                                             maxDuration: maxDuration
                                            });
	};

	this.delete = function(loanId) {
		return $http.delete('/api/loans/' + loanId);
	};


});
