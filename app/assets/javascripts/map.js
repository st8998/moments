//= require jquery
//= require jquery-pjax

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

  $.get('/moments.json', function(moments) {
    moments.forEach(function(moment) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(moment.lat, moment.lng),
        map: map,
        title: moment.title
      })

      google.maps.event.addListener(marker, 'click', function() {
        $.pjax({url: '/moments/'+moment.id, container: '#content'})
      })
    })
  })

  $(document).on('click', '#content .close', function(e) {
    $.pjax({url: '/moments', container: '#content'})
  })

});