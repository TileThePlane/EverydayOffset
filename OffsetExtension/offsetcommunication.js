function OffsetCommunication(config) {
	this.config = config;


}

OffsetCommunication.prototype.getOffsets = function() {
	var offsets = this.config.offsets;
	for(var i in offsets){
		
	}
	var offsets = ["Offset 1", "Offset 2", "Offset 3", "Offset 4"];



	return offsets;

};