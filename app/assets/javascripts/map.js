//= require markerclusterer

$(function() {

  var homeCoordinates = new google.maps.LatLng(53.21651837219011, 50.15031337738037)

  var mapOptions = {
    center: homeCoordinates,
    zoom: 13,
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

//  performSearch()

//  $(document).on('click', '.search-bar button', performSearch)
//  $(document).on('keyup', '.search-bar', function(e) {
//    if (e.which == 13)
//      performSearch()
//  })


  var geocoder;
  var map;
  var infowindow = new google.maps.InfoWindow();
  var marker;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.730885,-73.997383);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map($('#main-map').get(0), mapOptions);
  }

//  initialize()
//  codeLatLng()

  function codeLatLng() {
//    var input = document.getElementById("latlng").value;
//    var latlngStr = input.split(",",2);
//    var lat = parseFloat(latlngStr[0]);
//    var lng = parseFloat(latlngStr[1]);
    var latlng = new google.maps.LatLng(53.20346531907318, 50.14474779367447);
    geocoder.geocode({'latLng': latlng, language: 'ru'}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)

        if (results[1]) {
          map.setZoom(11);
          marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }


  var geocoder = new google.maps.Geocoder()
  setTimeout(function() {

//    var service = new google.maps.places.AutocompleteService();
//    service.getQueryPredictions({ input: 'аврора 57'}, function(data) {
//      console.log(data)
//    });

    geocoder.geocode({
      'address': 'собор святого вита'}, function(results, status) {
      console.log(results)
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    })
  }, 500)

});