app.controller('myoffsets',['$scope','$window','$http','$timeout',function($scope,$window,$http,$timeout){
	$scope.data =[];
		
	$scope.getchart = function(input_url){
		$http({
			url:input_url,
			method: 'GET'
		}).then(function successCallback(response){
			$scope.data = response.data;
			console.log($scope.data);
			$scope.updatechart();
		});
	}
	
	$scope.chart = $window.c3.generate({
			data:{
				json: $scope.data
			}
		});
	
	$scope.updatechart = function(){
		$scope.chart.load({
			json: $scope.data
			
		});
	};
	//simulate json requests from a server
	$timeout(function(){
		$scope.getchart('myoffsets');
	},0);
}]);