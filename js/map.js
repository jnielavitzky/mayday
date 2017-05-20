$(document).ready(initMap());


function initMap(){
    var uluru = {lat: -34.603289, lng: -58.367824};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}
