var app = angular.module('js');

app.controller('ArticleCtrl', function($scope, $routeParams, IdentitySvc, ArticlesSvc, $location, NotificationSvc) {
    $scope.iSvc = IdentitySvc;
    
    $scope.togglePanel = function(type) {
        $scope.selectedType = type;
    }

    $scope.deleteArticle = function(id) {
        ArticlesSvc.delete(id).then(function() {
            NotificationSvc.notify('Artikel erfolgreich erstellt');
			$location.path('/shop/articles/');
        });
    }

    $scope.toggleBlock = function(id, curStatus) {
        var newStatus = curStatus === 'blocked' ? 'free' : 'blocked';
        ArticlesSvc.updateStatus(id, newStatus).then(function() {
            NotificationSvc.notify('Status erfolgreich geändert');
            $location.path('/shop/articles/');
        });
    }

    ArticlesSvc.overview().then(function(response) {
        $scope.overviews = response.data;
	});
})