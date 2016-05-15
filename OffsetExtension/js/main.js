
var offsethandler = new OffsetHandler();
localStorage.userid = 111111;



function toggleOffset(e){
  var clickedId = e.srcElement.id;
  console.log(clickedId, "clicked")
  var image = document.getElementById(clickedId);
    if (image.src.match("play")) {
        image.src = "img/pause-icon.png";
    } else {
        image.src = "img/play-icon.png";
    }
  offsethandler.toggleOffset(clickedId);


}

document.addEventListener('DOMContentLoaded', function() {
  var offsets = offsethandler.getOffsets();
  for(var i in offsets){
    var offsetTable = document.getElementById("offsetTable");

    var row = offsetTable.insertRow(-1);
    var offsetName = row.insertCell(0);
    var offsetToggle = row.insertCell(1);

    offsetName.innerHTML = offsets[i].offsetName;
    var button = document.createElement('img');
    if(offsets[i].on){
      button.src = "img/play-icon.png";
    }
    else{
      button.src = "img/pause-icon.png";
    }
    button.id = i;
    button.addEventListener("click", toggleOffset)

    offsetToggle.appendChild(button)


  }
});

