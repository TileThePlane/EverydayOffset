app.controller('lifetimeoffsets',['$scope','$window','$http','$timeout','c3SimpleService',function($scope,$window,$http,$timeout,c3SimpleServic){
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
	
	$scope.charitydonation = 95;
	$scope.everydayoffsettip = 5;
	
	$scope.sliderconfig ={
		floor:0,
		ceil:100
		
	}
}]);