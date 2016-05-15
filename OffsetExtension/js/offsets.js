/**
 * Read and modify various OffsetHandleruration parameters.
 *
 * Abstracts away the underlying storage mechanism.
 */
function OffsetHandler() {
	// if (!localStorage.offsetSites) {
	// localStorage.offsets = JSON.stringify({
	// 	1001:{"site":"www.google.com","offsetName":"Google Offset","on":true,"triggerCount":0},	
	// 	1002:{"site":"www.netflix.com","offsetName":"Netflix Offset","on":true,"triggerCount":0},	
	// 	1003:{"site":"www.amazon.com","offsetName":"Amazon Offset","on":true,"triggerCount":0},	
	// });
	var userId = localStorage.userid;

}


OffsetHandler.prototype.triggerOffset = function(url){
	var id = _getID(url);
	console.log(id)
	if(id==null){
		return
	}
	console.log(_offsetOn(id))
	if(_offsetOn(id)){
		console.log(url,"triggered");
		_incrementOffset(url);
		_sendTriggerUpdate(id);
	}




};


OffsetHandler.prototype.addOffset = function(argument){
	 // body...  
};

//return json object with all offsets
OffsetHandler.prototype.getOffsets = function() {
	return _getOffsets();
	// var s = JSON.parse(localStorage.offsets);
 //    // var sites = {}
 //    // for (var site in s) {
 //    //   if (s.hasOwnProperty(site)) {
 //    //     sites[site] = s[site];
 //    //   }
 //    // }
 //    // console.log(sites)
 //    return s;
};



//toggles tracking for offsets
OffsetHandler.prototype.toggleOffset= function(address){
	var offsets = JSON.parse(localStorage.offsets)
	var s = offsets[address];

	var result = true;
	if(s.on){
		result = false;
	}
	else{
		result = true;
	}
	s.on = result;
	// console.log(address,"set to",result);
	offsets[address] = s;
	localStorage.offsets = JSON.stringify(offsets);
};

var _getOffsets = function(){
	var s = JSON.parse(localStorage.offsets);
    // var sites = {}
    // for (var site in s) {
    //   if (s.hasOwnProperty(site)) {
    //     sites[site] = s[site];
    //   }
    // }
    // console.log(sites)
    return s;
}

var _offsetNames = function(){
	 var offsets = this.getOffsets(); 
	 var names = []
	 for(var offset in offsets){
	 	names.push(offsets[offset]['offsetName']);
	 }
	 return names;
};

var _offsetSites = function(){
	 var offsets = this.getOffsets(); 
	 var names = []
	 for(var offset in offsets){
	 	names.push(offsets[offset]['site']);
	 }
	 return names;
};


var _incrementOffset = function(url){
	var oss = _getOffsets();
	for (var i in oss){
		if(oss[i]['site']==url){
			oss[i]['triggerCount'] = oss[i]['triggerCount']+1;
			console.log(url,'count incremented')
		}
	}
	localStorage.offsets=JSON.stringify(oss)
}

var _offsetOn = function(id){
	var offsets = _getOffsets();
	return offsets[id].on;
}


var _getID = function(url){
	var oss = JSON.parse(localStorage.offsets)
	for (var i in oss){
		if(oss[i]['site']==url){
			return i;
		}
	}
	return null;
}

var _sendTriggerUpdate = function(id){
	var http = new XMLHttpRequest();
	var url = "http://127.0.0.1:5000/postoffset/"+id;
	http.open("POST",url,true);
	http.send();
}
