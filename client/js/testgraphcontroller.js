app.controller('testgraph',['$scope','$window','$http',function($scope,$window,$http){
	$scope.data =[
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ];
	$http({
		url:'jsontestdata.json',
		method: 'GET'
	}).then(function successCallback(response){
		$scope.data = response.data;
		console.log($scope.data);
		$scope.chart();
		
	});
	
	$scope.chart = function(){
		$window.c3.generate({
			data:{
				json: $scope.data
			}
		});
	};
}]);