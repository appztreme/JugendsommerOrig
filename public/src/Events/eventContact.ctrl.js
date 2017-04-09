var app = angular.module('js');

app.controller('EventContactCtrl', function($scope, $routeParams, $location, NotificationSvc, EventsSvc) {

	$scope.title = 'Kontakte verwalten';

    $scope.options = {
        shadowInput: false,
        highlightFirst: true,       
        searchMethod: "search"
    };

    $scope.isNewContactFormVisible = false;

    $scope.toggleVisibility = function() {
        $scope.isNewContactFormVisible = !$scope.isNewContactFormVisible;
    }

    $scope.search = function(query, deferred) {
        var result = [];
        for(var i=0; i < $scope.allContacts.length; i++) {
            var c = $scope.allContacts[i];
            if(c.firstName.indexOf(query) !== -1 || c.lastName.indexOf(query) !== -1) 
                result.push({value: c.lastName + ' ' + c.firstName, id: c._id});
        }

        deferred.resolve({results: result});
    }

    $scope.saveContact = function() {
        console.log('contact will save');
    }

    EventsSvc.getAllContacts().success(function(cs) {
        console.log(cs)
        $scope.allContacts = cs;
    });

    EventsSvc.getContacts($routeParams.eventId).success(function(c) {
        $scope.assignedContacts = c.contacts;
    });
});

angular.module("contactTemplate.html", []).run(["$templateCache", function($templateCache) {
		$templateCache.put("contactTemplate.html",
			'<ul ng-show="show" class="szn-autocomplete-results">\n' +
				'<li szn-autocomplete-result ng-repeat="result in results" ng-class="{selected: highlightIndex == $index}">\n' +
                           '<div><span view-as-html="result.value | sznAutocompleteBoldMatch:query"></span></span></div>\n' +
					'<p view-as-html="result.perex"></p>\n' +                   
				'</li>\n' +
			'</ul>'
		);
	}]);