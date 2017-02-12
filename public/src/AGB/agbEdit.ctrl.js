var app = angular.module('js');

app.controller('AgbEditCtrl', function($scope, $routeParams, $location, AgbsSvc, NotificationSvc) {
	$scope.activityId = $routeParams.activityId;
	$scope.type = $routeParams.type;
	// console.log("type:", $routeParams.type);

	// $scope.updateAgb = function() {
	// 	AgbsSvc.update($scope.agb).success(function(agb) {
	// 	}).then(function() {
	//
	// 		NotificationSvc.notify('Aenderung erfolgreich gespeichert');
	// 	});
	// };

	// AgbsSvc.find().success(function(agbs) {
	// 	$scope.agb = agbs[0];
	// });

});
