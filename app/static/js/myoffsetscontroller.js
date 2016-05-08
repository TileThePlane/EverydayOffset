app.controller('myoffsets',['$scope','$window','$http','$timeout',function($scope,$window,$http,$timeout){
	$scope.data =[];
		
	$scope.getoffsets = function(input_url){
		$http({
			url:input_url,
			method: 'GET'
		}).then(function successCallback(response){
			$scope.data = response.data;
			console.log($scope.data);
			$scope.updatechart();
		});
	};
	//simulate json requests from a server
	$timeout(function(){
		$scope.getoffsets('http://localhost:5000/myoffsets');
	},0);
}]);