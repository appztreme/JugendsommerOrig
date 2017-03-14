var app = angular.module('js');

app.controller('EventsCtrl', function($scope, $routeParams, $location, EventsSvc, IdentitySvc, $rootScope, $translate) {
	//$scope.busyPromise = EventsSvc.find();
	var host = $location.$$host.toLowerCase();
	$scope.isKiso = host.indexOf('kiso') !== -1

	$scope.lang = $translate.proposedLanguage() || $translate.user();

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
    });

	if(IdentitySvc.isAdmin()) {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByTypeAsAdmin($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				EventsSvc.findBySummerLocationAsAdmin($routeParams.location).success(function(evs) {
					$scope.events = evs;
				});
			} else {
				EventsSvc.findByLocationAsAdmin($routeParams.location).success(function(evs) {
					$scope.events = evs;
				});
			}
		}
	} else {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByType($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				EventsSvc.findBySummerLocation($routeParams.location).success(function(evs) {
					$scope.events = evs;
				});
			} else {
				$scope.events = [{
					_id:"58c80c8c20c5a446ea91f62b",
					budgetBusiness:5,
					budgetFood:5,
					description:"Für Grundschulkinder aller Muttersprachen. Das Programm wird in deutscher Sprache angeboten, somit werden genügend Grundkenntnisse der deutschen Sprache vorausgesetzt.",
					description_it:"Per bambini di qualsiasi madrelingua che frequentano le elementari. Le attività vengono svolte in lingua tedesca, perciò è richiesta una sufficiente conoscenza della lingua tedesca.",
					endDate: new Date("2017-08-04T00:00:00.000Z"),
					info:"Für Grundschulkinder aller Muttersprachen. Das Programm wird in deutscher Sprache angeboten, somit werden genügend Grundkenntnisse der deutschen Sprache vorausgesetzt. Maximal 45 Kinder pro Woche.",
					info_it:"Per bambini di qualsiasi madrelingua che frequentano le elementari. Le attività vengono svolte in lingua tedesca, perciò è richiesta una sufficiente conoscenza della lingua tedesca. Al massimo 45 bambini a settimana.",
					isInternal:false,
					location:"Bozen",
					location_it:"Bolzano",
					name:"KiSo - Kindersommer",
					name_it:"KiSo - Kindersommer",
					startDate: new Date("2017-06-19T00:00:00.000Z"),
					type:"summer",
					visibleFrom:new Date("2017-03-14T00:00:00.000Z"),
					visibleTo: new Date("2017-06-01T00:00:00.000Z")
				}];
				// EventsSvc.findByLocation($routeParams.location).success(function(evs) {
				// 	$scope.events = evs;
				// });
			}

		}
	}
});
