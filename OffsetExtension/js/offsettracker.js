var offsethandler = new OffsetHandler();
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // var currurl = tab.url
  // console.log("updated")
  var currurl = trimProtocol(tab.url);
  currurl = trimWWW(currurl);
  currurl = trimPath(currurl);
  if(localStorage.prevurl != currurl){
    console.log(currurl)
     // conf.triggerURL(currurl);
     // conf.incrementOffset(currurl);
     localStorage.prevurl = currurl;
     offsethandler.triggerOffset(currurl);
     // conf.sendTriggerUpdate(currurl)


  }
 
  

});

function trimProtocol(url) {
  var p = url.indexOf('://');
  if (p > -1) {
    url = url.slice(p + '://'.length);
  }
  return url;
}

function trimWWW(url) {
  if (url.slice(0, 4) == 'www.')
    url = url.slice(4);
  return url;
}

function trimPath(url) {
  p = url.indexOf('/');
  if (p > -1)
    domain = url.slice(0, p);
  else
    domain = url;
  return domain;
}