app.controller('myoffsets',['$scope','$window','$http','$timeout','c3SimpleService',function($scope,$window,$http,$timeout,c3SimpleService){
	$scope.state = {
		showAddOffset:false,
		graphdatadisplayed:5*60*1000
	};
	
	$scope.setGraphDataDisplayed = function(time){
		$scope.state.graphdatadisplayed = time;
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
			url:"http://everydayoffset.me:5000/myoffsets/view="+offsetid,
			method: 'GET'
		}).then(function successCallback(response){
			//console.log(response);
			$scope.datacurrentlydisplayed = response.data.offset;
			//console.log($scope.data);

		});				
	};
	
	//gets all the offset data to build the names on the page, and all graph data as well
	$scope.getalloffsets = function(userID){
		$http({
			url:"http://everydayoffset.me:5000/myoffsets/"+userID,
			method: 'GET'
		}).then(function successCallback(response){
			var user = response;
			//console.log(user);
			var offsetlist = user.data["user_data"].offsets;
			//console.log(offsetlist);
			
			var i = 0;
			var getdata = function(){
				$http({
					url:"http://everydayoffset.me:5000/myoffsets/view="+offsetlist[i],
					method: 'GET'
				}).then(function successCallback(response){

					//console.log(response);
					$scope.data['offsets'].push(response.data.offset);
					if(i==0){
						$scope.datacurrentlydisplayed = $scope.data.offsets[0];
						$scope.donationchart.data.columns = $scope.datacolumns();
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
	
	
	/*
	transforms data from server into c3 code.
	*/
	$scope.datacolumns = function(){
		if(jQuery.isEmptyObject($scope.datacurrentlydisplayed))
			return [['date_time_stamp'],['donation_amount']];
		

		var result = [['date_time_stamp'],['donation_amount']];
		//console.log($scope.datacurrentlydisplayed['date_time_stamp_list']);
		var timefilter = Date.now() - $scope.state.graphdatadisplayed;
		for(var i=0;i<$scope.datacurrentlydisplayed['date_time_stamp_list'].length;i++){
			//condition where we'd put the distance back we want to go
			//if(timefilter<$scope.datacurrentlydisplayed['date_time_stamp_list'][i])
			if(true){
				result[0].push($scope.datacurrentlydisplayed['date_time_stamp_list'][i].substring(0,10));
				result[1].push($scope.datacurrentlydisplayed['donation_amount_list'][i]+(Math.random()/10));
				//result[1].push($scope.datacurrentlydisplayed['donation_amount_list'][i]);
			}
		}
		//console.log(result);
		return result;
	};
	
	
	$scope.donationchart = {
      data : {
        x: 'date_time_stamp',
        type: 'area',
        columns: $scope.datacolumns()
      },
      axis: {
        x:{
          type: "timeseries",
          tick: {
            format: function(value) {
			//console.log(value);
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

	var polltimeout = 0;
	$scope.poller = function() {
    $http.get('http://everydayoffset.me:5000/myoffsets/view='+$scope.datacurrentlydisplayed['offset_id']).then(function(response) {
      $scope.datacurrentlydisplayed = response.data.offset;
	  c3SimpleService['#donationchart'].load({columns:$scope.datacolumns()});
	  console.log('polled');
      polltimeout = $timeout($scope.poller, 3000);
    });      
  };
  
    $scope.$on("$destroy", function() {
        if (polltimeout) {
            $timeout.cancel(polltimeout);
        }
    });

	
	//json requests from a server
	$timeout(function(){
		//$scope.getalloffsets('bcbafe27-278d-49dc-bc26-139d45136528');
		$scope.getalloffsets('f2290d1a-781e-46b1-b2f2-458e1bb385c1');
		$scope.$apply();
		$scope.poller();
	},0);
}]);