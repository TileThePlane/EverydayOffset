app.controller('myoffsets',['$scope','$window','$http','$timeout','c3SimpleService',function($scope,$window,$http,$timeout,c3SimpleService){
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
		$scope.donationchart.data.columns = $scope.datacolumns();
	};
	
	$scope.updatecurrentoffset = function(){
		var offsetid = $scope.datacurrentlydisplayed['offset_id'];
		$http({
			url:"http://localhost:5000/myoffsets/view="+offsetid,
			method: 'GET'
		}).then(function successCallback(response){
			console.log(response);
			$scope.datacurrentlydisplayed = response.data.offset;
			console.log($scope.data);

		});				
	};
	
	//gets all the offset data to build the names on the page, and all graph data as well
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
	
	/*$scope.datatransform = function(offset,chartdatatype){
		if(jQuery.isEmptyObject(offset))
			return [chartdatatype];
		var result = [chartdatatype];
		for(var i =0;i<offset.offset_events.length;i++){
			result.push(offset.offset_events[i][chartdatatype]);
		}
		console.log("data");
		console.log(result);
		return result;
	};*/
	
	$scope.datacolumns = function(){
		if(jQuery.isEmptyObject($scope.datacurrentlydisplayed))
			return [['date_time_stamp'],['donation_amount']];
		
		/*
		var result = [['date_time_stamp'],['donation_amount']];
		$scope.datacurrentlydisplayed.offset_events.sort(function(a,b){
			return a.date_time_stamp.localeCompare(b.date_time_stamp);
		});
		console.log($scope.datacurrentlydisplayed);
		for(var i =0;i<$scope.datacurrentlydisplayed.offset_events.length;i++){
			result[0].push($scope.datacurrentlydisplayed.offset_events[i]['date_time_stamp'].substring(0,10));
			result[1].push($scope.datacurrentlydisplayed.offset_events[i]['donation_amount']);
		}
		
		return result;*/
		var result = [['date_time_stamp'],['donation_amount']];
		console.log($scope.datacurrentlydisplayed['date_time_stamp_list']);
		//Array.prototype.push.apply(result[0],$scope.datacurrentlydisplayed['date_time_stamp_list']);
		for(var i=0;i<$scope.datacurrentlydisplayed['date_time_stamp_list'].length;i++){
			result[0].push($scope.datacurrentlydisplayed['date_time_stamp_list'][i].substring(0,10));
		}
		Array.prototype.push.apply(result[1],$scope.datacurrentlydisplayed['donation_amount_list']);
		console.log(result);
		return result;
	};
	
	$scope.donationchart = {
      data : {
        x: 'date_time_stamp',
        type: 'bar',
        columns: $scope.datacolumns()
      },
      axis: {
        x:{
          type: "timeseries",
          tick: {
            format: function(value) {
			console.log(value);
              var month = value.getUTCMonth() + 1;
              var year = value.getUTCFullYear();
			  var day = value.getUTCDay();
              //return month + '-' + year;
			  return month + '-' + day+ '-'+year;
            }
          }
        }
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
              return value;
          }
        }
      },
      legend: {
        show: false
      }
    };
	
	//json requests from a server
	$timeout(function(){
		//$scope.getalloffsets('bcbafe27-278d-49dc-bc26-139d45136528');
		$scope.getalloffsets('f2290d1a-781e-46b1-b2f2-458e1bb385c1');
		$scope.$apply();
	},0);
}]);