chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

	chrome.runtime.onMessage.addListener(function(request,sender,senderResponse){
		console.log("MESSAGE RECEIVED");
		console.log("message",request);
		return true;
	})
});