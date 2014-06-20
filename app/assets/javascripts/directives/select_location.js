angular.module('app').directive('mSelectLocation', function(settings, Place) {
  return {
    restrict: 'E',
    templateUrl: '/template/directives/select_location.html',
    replace: true,
    scope: {onApply: '&', onCancel: '&'},
    link: function(scope, elem, attrs) {
      var place = scope.place = new Place()

      scope.mode = 'move'
      scope.minimized = true

      var map = new google.maps.Map(elem.find('.map').get(0), {
        zoom: 12,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
        center: settings.map.defaultCenter
      })

      var marker = new google.maps.Marker({map: map, draggable: true})

      var geocoder = new google.maps.Geocoder()

      scope.lookupAddress = function() {
        geocoder.geocode({'address': scope.searchTerm, bounds: map.getBounds()}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            place = scope.place = Place.fromGeocode(results[0])
            scope.$digest()

            map.setCenter(place.getLatLng())
            map.setZoom(place.zoomLevel())
            map.panBy(-150, 0)
          }
        })
      }

      function handleNewPosition(e) {
        place.setLatLng(e.latLng)
        scope.$digest()

        map.setCenter(e.latLng)
        map.panBy(-150, 0)

        geocoder.geocode({'latLng': e.latLng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            place = scope.place = place.mergeGeocode(results[0])
            scope.minimized = false
            scope.$digest()
          }
        })
      }

      var minimizePanelHandle = google.maps.event.addListener(map, 'dragstart', function() {
        scope.minimized = true
        scope.$digest()
      })

      var markerClickHandle = google.maps.event.addListener(marker, 'click', function(e) {
        scope.minimized = false
        scope.$digest()
        map.setCenter(e.latLng)
        map.panBy(-150, 0)
      })

      var addMarkerHandle = google.maps.event.addListener(map, 'click', function(e) {
        if (scope.mode == 'locate') {
          handleNewPosition(e)
        }
      })
      var markerDragHandle = google.maps.event.addListener(marker, 'dragend', handleNewPosition)


      scope.$watch('mode', function(mode) {
        if (!mode) return

        map.setOptions({draggableCursor: mode == 'move' ? null : 'crosshair'})
      })

      scope.$watch('place', function(place) {
        if (!place) return

        marker.setTitle(place.name)

        if (place.lat && place.lng) {
          marker.setPosition(place.getLatLng())
          map.setCenter(place.getLatLng())
          map.panBy(-150, 0)
        }
      })

      // just grab the copy place from parent scope into local one
      scope.$parent.$watch(attrs['place'], function(newPlace) {
        if (!newPlace) return

        place = scope.place = newPlace.copy()
      })

      scope.$on('$destroy', function() {
        google.maps.event.removeListener(markerDragHandle)
        google.maps.event.removeListener(addMarkerHandle)
        google.maps.event.removeListener(markerClickHandle)
        google.maps.event.removeListener(minimizePanelHandle)
      })
    }
  }
})

