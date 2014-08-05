angular.module('app').constant('MAP_SETTINGS', {
  key: 'AIzaSyA6t72tJ8MY1E6HkWTe0GqrpXnegDYCEf4',
  typeToZoom: {
    country: 7,
    administrative_area_level_1: 10,
    locality: 12,
    route: 15,
    street_number: 17
  },
  defaults: {
    zoom: 12,

    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT
    },

    panControl: false,
    zoomControl: false,
    streetViewControl: false,

    center: new google.maps.LatLng(53.21651837219011, 50.15031337738037)

    ,styles: [
      {"featureType": "landscape", "stylers": [
        {"saturation": -100},
        {"lightness": 60}
      ]},
      {"featureType": "road.local", "stylers": [
        {"saturation": -100},
        {"lightness": 40},
        {"visibility": "on"}
      ]},
      {"featureType": "transit", "stylers": [
        {"saturation": -100},
        {"visibility": "simplified"}
      ]},
      {"featureType": "administrative.province", "stylers": [
        {"visibility": "off"}
      ]},
      {"featureType": "water", "stylers": [
        {"visibility": "on"},
        {"lightness": 30}
      ]},
      {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [
        {"color": "#ef8c25"},
        {"lightness": 40}
      ]},
      {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [
        {"visibility": "off"}
      ]},
      {"featureType": "poi.park", "elementType": "geometry.fill", "stylers": [
        {"color": "#b6c54c"},
        {"lightness": 40},
        {"saturation": -40}
      ]},
      {}
    ]
  }
})
