//= require jquery
//= require jquery-pjax
//= require markerclusterer

$(function() {

  var homeCoordinates = new google.maps.LatLng(53.21651837219011, 50.15031337738037)

  var mapOptions = {
    center: homeCoordinates,
    zoom: 12,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  }

  var map = new google.maps.Map($('#main-map').get(0),
    mapOptions)

  var markerCluster = new MarkerClusterer(map, [], {
    averageCenter: true
  })

  function processSearchResults(response) {
    var moments = response.hits.hits.map(function(hit) {
      return hit._source
    })

    var markers = moments.map(function(moment) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(moment.lat, moment.lng),
        title: moment.title
      })

      google.maps.event.addListener(marker, 'click', function() {
        $.pjax({url: '/moments/'+moment.id, container: '#content'})
      })

      return marker
    })

    markerCluster.clearMarkers()
    markerCluster.addMarkers(markers)
  }

  function performSearch() {
    var searchText = $('.search-bar input[type=text]').val()

    if (searchText) {
      $.ajax({
        url: 'http://localhost:9200/moments/moment/_search',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          "query" : {
            "query_string" : {
              "query" : searchText
            }
          }
        }),
        success: processSearchResults
      })
    } else {
      $.get('http://localhost:9200/moments/moment/_search', processSearchResults)
    }
  }

  performSearch()

  $(document).on('click', '.search-bar button', performSearch)
  $(document).on('keyup', '.search-bar', function(e) {
    if (e.which == 13)
      performSearch()
  })

  $(document).on('click', '#content .btn-close', function(e) {
    $.pjax({url: '/moments', container: '#content'})
  })

});