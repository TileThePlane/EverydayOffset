app.controller('myoffsets',['$scope','$window','$http','$timeout',function($scope,$window,$http,$timeout){
	$scope.data ={"offsets":[{"name":"hi","active":"true"}]};
		
	$scope.getoffsets = function(input_url){
		$http({
			url:input_url,
			method: 'GET'
		}).then(function successCallback(response){
			$scope.data = response.data;
			console.log($scope.data);
		});
	};
	//json requests from a server
	$timeout(function(){
		$scope.getoffsets('http://localhost:5000/myoffsets');
		$scope.$apply();
	},0);
}]);