var app = angular.module('js');

app.controller('MyCommitmentsCtrl', function($scope, $location, $route, CommitmentSvc, IdentitySvc) {
	$scope.busyPromise = CommitmentSvc.findByUser(IdentitySvc.currentUser._id);

	$scope.formatBool = function(b) {
		if(b) return "ja";
		return "nein";
	};

	CommitmentSvc.findByUser(IdentitySvc.currentUser._id).success(function(commitments) {
		$scope.sum = Math.round(_.reduce(commitments, function(sum, object) {
			return sum + object.amount;
		}, 0) * 100) / 100;
		$scope.commitments = _.values(_.groupBy(commitments, "eventId._id"));
	});
});
