/**
 * Read and modify various configuration parameters.
 *
 * Abstracts away the underlying storage mechanism.
 */
function Config() {
	// if (!localStorage.offsetSites) {
	// localStorage.offsets = JSON.stringify({
	// 	1001:{"site":"www.google.com","offsetName":"Google Offset","on":true,"triggerCount":0},	
	// 	1002:{"site":"www.netflix.com","offsetName":"Netflix Offset","on":true,"triggerCount":0},	
	// 	1003:{"site":"www.amazon.com","offsetName":"Amazon Offset","on":true,"triggerCount":0},	
	// });
	var userId = localStorage.userid;

}

Config.prototype.addOffset = function(argument){
	 // body...  
};

Config.prototype.offsets = function() {
	var s = JSON.parse(localStorage.offsets);
    var sites = {}
    for (var site in s) {
      if (s.hasOwnProperty(site)) {
        sites[site] = s[site];
      }
    }
    console.log(sites)
    return sites;
};

Config.prototype.offsetNames = function(){
	 var offsets = this.offsets(); 
	 var names = []
	 for(var offset in offsets){
	 	names.push(offsets[offset]['offsetName']);
	 }
	 return names;
};

Config.prototype.toggleOffsetTrack= function(address){
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
	console.log(address,"set to",result);
	offsets[address] = s;
	localStorage.offsets = JSON.stringify(offsets);
};
Config.prototype.offsetSites = function(){
	 var offsets = this.offsets(); 
	 var names = []
	 for(var offset in offsets){
	 	names.push(offsets[offset]['site']);
	 }
	 return names;
};
Config.prototype.isOffset = function(url){
	 var offsets = this.offsetSites(); 
	 for(var offset in offsets){
	 	if(offsets[offset]==url){
	 		return true;
	 	}
	 }
	 return false;
};

Config.prototype.incrementOffset = function(url){
	var oss = JSON.parse(localStorage.offsets)
	for (var i in oss){
		if(oss[i]['site']==url){
			oss[i]['triggerCount'] = oss[i]['triggerCount']+1;
			console.log(url,'count incremented')
		}
	}
	localStorage.offsets=JSON.stringify(oss)
}
Config.prototype.getID = function(url){
	var oss = JSON.parse(localStorage.offsets)
	for (var i in oss){
		if(oss[i]['site']==url){
			return i;
		}
	}
	return null;
}


Config.prototype.sendTriggerUpdate = function(url){
	var id = this.getID(url);
	if(id==null){
		return;
	}

	console.log(id);
	var http = new XMLHttpRequest();
	var url = "http://127.0.0.1:5000/postoffset/"+id;
	http.open("POST",url,true);
	http.send();
}
