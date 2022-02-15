let map;

//Brisbane is the default map center
function initMap() {
  const Brisbane = { lat: -27.448911352262186, lng: 153.02748850708184 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: Brisbane,
    zoom: 12,
  });
}

function changeMap(lat, lng, assault, robbery, sexual) {
  const place = { lat: lat, lng: lng };
  map = new google.maps.Map(document.getElementById("map"), {
    center: place,
    zoom: 11,
  });
  const contentString1 ="<p><b>Number of crimes per year</b><br><br>Assualt: " + assault + "<br>Robbery: " + robbery + "<br>Sexual Offences: " + sexual + "</p>"
  const infowindow1 = new google.maps.InfoWindow({
    content: contentString1,
  });

  level = calculateSafetyLevel(assault, robbery, sexual);
  const contentString2 ='<div><h3>Safety Level</h3><img style="width:82px;height:100px;" src ="img/'+ level + '.jpeg"/></div>'
  const infowindow2 = new google.maps.InfoWindow({
    content: contentString2,
  });

  addMarker(infowindow1, infowindow2, place, map);
}

function addMarker(infowindow1, infowindow2, location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  marker.addListener("click", () => {
    infowindow1.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
  var circle = new google.maps.Circle({
    map: map,
    radius: 16000,    // 10 miles in metres
    fillColor: '#AA0000'
  });
  circle.bindTo('center', marker, 'position');

  google.maps.event.addListener(circle,'click',function(event)
  {
    infowindow2.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
    infowindow2.open(map,this); 
  });
}

//reference: google maps developer documentation
//https://developers.google.com/maps/documentation/javascript/examples/marker-labels
$(document).ready(function() {
  $(".search_button").click(function(){
        var place = $(".search").val().trim();   
        $.getJSON("https://www.data.qld.gov.au/api/3/action/datastore_search?q=" + place + "&resource_id=8b29e643-56a3-4e06-81da-c913f0ecff4b", function(data){
          //response data are now in the data variable
          var records = data.result.records
          var assault = 0, robbery = 0, sexual = 0
          for (let record of records){
              assault += record.Assault
              robbery += record.Robbery
              sexual += record["Sexual Offences"]
          }
          $("#assault_number").text(assault)
          $("#robbery_number").text(robbery)
          $("#sexual_number").text(sexual)
          $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + place + "+Queensland&key=AIzaSyBGi-S_snda8R9BcIXaDmjckZXad9JJ0Ds", function(data){
          //response data are now in the data variable
          var lat = data.results[0].geometry.location.lat
          var lng = data.results[0].geometry.location.lng
          changeMap(lat, lng, assault, robbery, sexual)
          });
        });

        

  });
});

function calculateSafetyLevel(assault,robbery,sexual){
    result = (robbery * 2 + sexual + assault * 0.5) / 3;
    level1 = 200;
    level2 = 500;
    if(result < level1)
      return 3
    else if(result > level1 && result < level2)
      return 2
    else
      return 1
}

//Assault
//Sexual Offences
//Robbery
