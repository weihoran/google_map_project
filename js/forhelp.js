
$(document).ready(function(){

	//get the previous cliked item name on window loading
    var index = sessionStorage.getItem("item");
    //select the corresponding elemnt with the item name saved in session
    var element = document.getElementById(index);
    //scroll the screen to the selected element
    element.scrollIntoView();
});