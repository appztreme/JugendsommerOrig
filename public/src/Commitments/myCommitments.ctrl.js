var app = angular.module('js');

app.controller('MyCommitmentsCtrl', function($scope, $location, $route, CommitmentSvc, IdentitySvc) {
	$scope.busyPromise = CommitmentSvc.findByUser(IdentitySvc.currentUser._id);

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	CommitmentSvc.findByUser(IdentitySvc.currentUser._id).success(function(commitments) {
		$scope.commitments = commitments;
		$scope.user = IdentitySvc.currentUser;
	});
});
