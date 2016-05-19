app.controller('lifetimeoffsets',['$scope','$window','$http','$timeout','c3SimpleService',function($scope,$window,$http,$timeout,c3SimpleService){
	$scope.state = {
		showDonationPlanner: true,
		showImpact: true,
		showGoal: true
	};
	
	$scope.collapse = function(bool){
		if(bool)
			return "-";
		else
			return "+";
	}
}]);