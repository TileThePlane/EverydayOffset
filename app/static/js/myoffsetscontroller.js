app.controller('myoffsets',['$scope','$window','$http','$timeout',function($scope,$window,$http,$timeout){
	$scope.state = {
		showAddOffset:false
	};

	//all data about all offsets sent from the server
	$scope.data ={"offsets":[]};
	
	//data displayed on the page
	$scope.datacurrentlydisplayed = {};
	
	//set the data that is displayed on the page.
	$scope.setcurrentlydisplayed = function(clickedoffset){
		$scope.datacurrentlydisplayed = clickedoffset;
		$scope.state.showAddOffset = false;
	}
	
	
	
	$scope.getalloffsets = function(userID){
		$http({
			url:"http://localhost:5000/myoffsets/"+userID,
			method: 'GET'
		}).then(function successCallback(response){
			var user = response;
			console.log(user);
			var offsetlist = user.data["user_data"].offsets;
			console.log(offsetlist);
			
			var i = 0;
			var getdata = function(){
				$http({
					url:"http://localhost:5000/myoffsets/view="+offsetlist[i],
					method: 'GET'
				}).then(function successCallback(response){

					console.log(response);
					$scope.data['offsets'].push(response.data.offset);
					if(i==0){
						$scope.datacurrentlydisplayed = $scope.data.offsets[0];
					}
					//loop
					i = i+1;
					if(i>=offsetlist.length)
						return;
					else
						getdata();
				});				
			};
			getdata();

		});
	};
	
	
	//json requests from a server
	$timeout(function(){
		//$scope.getalloffsets('bcbafe27-278d-49dc-bc26-139d45136528');
		$scope.getalloffsets('6b8bad38-8350-46a0-97f5-5492c1709062');
		$scope.$apply();
	},0);
}]);