
console.log("loaded");
// if(localStorage.userid != ""){
// 	window.location.href = "main.html";
// }

function logUserId(){
	// console.log(e)
	var uid = document.getElementById("userID");
	localStorage.userid = uid.value
	window.location.href = "main.html";

}

document.addEventListener('DOMContentLoaded', function() {
	// if(localStorage.userid != ""){
	// 	window.location.href = "../main.html";
	// }
     var button = document.getElementById("submitID");
    button.addEventListener("click", logUserId)




});