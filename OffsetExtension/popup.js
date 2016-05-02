
function getOffsets(){
  var offsets = ["Offset 1", "Offset 2", "Offset 3", "Offset 4"];
  return offsets
}

function toggleOffset(e){
  var clickedId = e.srcElement.id;
  console.log(clickedId, "clicked")
  var image = document.getElementById(clickedId);
    if (image.src.match("play")) {
        image.src = "img/pause-icon.png";
    } else {
        image.src = "img/play-icon.png";
    }


}

document.addEventListener('DOMContentLoaded', function() {
  var offsets = getOffsets();
  console.log("Offsets: ",offsets)
  for(var i in offsets){
    var offsetTable = document.getElementById("offsetTable");

    var row = offsetTable.insertRow(-1);
    var offsetName = row.insertCell(0);
    var offsetToggle = row.insertCell(1);

    offsetName.innerHTML = offsets[i];
    var button = document.createElement('img');
    button.src = "img/play-icon.png";
    button.id = offsets[i]
    button.addEventListener("click", toggleOffset)

    offsetToggle.appendChild(button)


  }
});

