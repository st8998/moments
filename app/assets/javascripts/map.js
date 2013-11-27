//= require jquery

$(function() {

  var homeCoordinates = new google.maps.LatLng(53.21651837219011, 50.15031337738037)

  var mapOptions = {
    center: homeCoordinates,
    zoom: 12,
    mapTypeControl: false,
    panControl: false
  }

  var map = new google.maps.Map($('#main-map').get(0),
    mapOptions)

//  var home = new google.maps.Marker({
//    position: homeCoordinates,
//    map: map,
//    title: 'Home, sweet home.'
//  })

  $.get('/moments.json', function(moments) {
    moments.forEach(function(moment) {
      new google.maps.Marker({
        position: new google.maps.LatLng(moment.lat, moment.lng),
        map: map,
        title: moment.title
      })
    })
  })

});