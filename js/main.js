

$(".explore-button").click(function(){
  window.location.href="navigation.html"
  //alert("you clicked the button!")
});



$(".helpmenu li a").click(function(){
	//get which subitem is clicked inside the help menu
	var itemNumber = $(this).attr("class");
	//save the name of the clicked item into sessionStorage
	sessionStorage.setItem("item",itemNumber);
	//navigate to help page
	window.location.href = "help.html"
});


//the imgae click popup function codes

$("img").click(function(){
  var modalImg = document.getElementById("popimg")
  var modal = document.getElementById("myModal")
  modal.style.display = "block";
  modalImg.src = this.src;
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() { 
  modal.style.display = "none";
  }

});