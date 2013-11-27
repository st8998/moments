//= require jquery

$(function() {

  var homeCoordinates = new google.maps.LatLng(53.21651837219011, 50.15031337738037)

  var mapOptions = {
    center: homeCoordinates,
    zoom: 12
  }

  var map = new google.maps.Map($('#main-map').get(0),
    mapOptions)

  var home = new google.maps.Marker({
    position: homeCoordinates,
    map: map,
    title: 'Home, sweet home.'
  })

});