app.controller('myoffsets',['$scope','$window','$http','$timeout',function($scope,$window,$http,$timeout){
	//all data about all offsets sent from the server
	$scope.data ={"offsets":[{"name":"hi","active":"true"}]};
	
	//data displayed on the page
	$scope.datacurrentlydisplayed = {};
	
	//set the data that is displayed on the page.
	$scope.setcurrentlydisplayed = function(clickedoffset){
		$scope.datacurrentlydisplayed = clickedoffset;
	}
	
	$scope.getoffsets = function(input_url){
		$http({
			url:input_url,
			method: 'GET'
		}).then(function successCallback(response){
			$scope.data = response.data;
			console.log($scope.data);
			$scope.datacurrentlydisplayed = $scope.data.offsets.offset2;
		});
	};
	//json requests from a server
	$timeout(function(){
		$scope.getoffsets('http://localhost:5000/myoffsets');
		$scope.$apply();
	},0);
}]);