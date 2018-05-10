var app = angular.module('js');

app.service('ArticlesSvc', function($http) {
    this.overview = function() {
        return $http.get('/api/articles/overview');
    }

	this.findById = function(articleId) {
		return $http.get('/api/articles/' + articleId);
	};

	this.create = function(article) {
	    return $http.post('/api/articles', article);	
	};

	this.update = function(article) {
		return $http.put('/api/articles', article);
    };
    
    this.delete = function(id) {
        return $http.delete('/api/articles/' + id);
    };

    this.updateStatus = function(id, status) {
        return $http.patch('/api/articles/status', {id: id, newStatus: status});
    };

    this.updateIsInSet = function(id, isInSet) {
        return $http.patch('/api/articles/isInSet', {id: id, isInSet: isInSet });
    };

});