angular.module('app').factory('Place', function(MAP_SETTINGS) {
  /**
   * @class Place
   * @property {Number} lat - latitude
   * @property {Number} lng - longitude
   * @property {String} name - name of this place
   * @property {String} country - country
   * @property {String} administrative_area_level_1 - region
   * @property {String} locality - city/village
   * @property {String} street_number - house number
   * @property {String} route - name of route
   * @property {String} postal_code - postal code
   * @param {object} [attrs] - Initial place components
   * @constructor
   */
  function Place(attrs) {
    _.extend(this, attrs)
  }

  Place.prototype.attributes = function() {
    return _.pick(this, 'lat','lng','name','country','administrative_area_level_1','locality','street_number','postal_code','route')
  }

  /**
   * Generates url to static google map image representing this place
   * @param {object} [props]
   * @see {@link https://developers.google.com/maps/documentation/staticmaps/#URL_Parameters}
   * @returns {string} image url
   */
  Place.prototype.imageUrl = function(props) {
    var defaultProps = {
      key: MAP_SETTINGS.key,
      size: '350x150',
      scale: 1,
      zoom: this.zoomLevel() - 1,
      center: ''+this.lat+','+this.lng,
      sensor: false,
      markers: 'color:red|'+this.lat+','+this.lng
    }

    var queryString = $.param(_.extend(defaultProps, props))
    return 'http://maps.googleapis.com/maps/api/staticmap?' + queryString
  }

  /**
   * Returns google maps LatLng object representing this place
   * @returns {google.maps.LatLng|undefined} Google map LatLng or nothing if place doesn't have lat/lng
   */
  Place.prototype.getLatLng = function() {
    if (this.lat && this.lng)
      return new google.maps.LatLng(this.lat, this.lng)
  }

  /**
   * Assigns lat/lng properties from Google point
   * @param latLng {google.maps.LatLng}
   * @returns {Place} this object for chaining
   */
  Place.prototype.setLatLng = function(latLng) {
    this.lat = latLng.lat()
    this.lng = latLng.lng()
    return this
  }

  Place.fromGeocode = function(geocode) {
    var place = new Place()

    geocode.address_components.forEach(function(comp) {
      var type = comp.types[0]

      switch (type) {
        case 'country':
        case 'administrative_area_level_1':
        case 'locality':
        case 'street_number':
        case 'postal_code':
          place[type] = comp.long_name
          break
        // case 'administrative_area_level_2': switched off for now
        case 'route':
          place[type] = comp.short_name
          break
      }
    })

    place.lat = geocode.geometry.location.lat()
    place.lng = geocode.geometry.location.lng()

    return place
  }

  Place.prototype.mergeGeocode = function(geocode) {
    var newPlace = Place.fromGeocode(geocode)

    newPlace.lat = this.lat
    newPlace.lng = this.lng
    newPlace.name = this.name

    return newPlace
  }

  Place.prototype.zoomLevel = function() {
    var smallestComponent =
      _.find(['street_number','route','locality','administrative_area_level_1','country'], function(c) {return !!this[c]}, this)

    console.log(MAP_SETTINGS.typeToZoom[smallestComponent])

    return MAP_SETTINGS.typeToZoom[smallestComponent]
  }

  /**
   * Constructs new Place from this instance using only place attributes
   * @returns {Place} New Place
   */
  Place.prototype.copy = function() {
    return new Place(this.attributes())
  }

  /**
   * Constructs array of primary place components
   * @returns {Array}
   */
  Place.prototype.primaryLine = function() {
    var line = []
    if (this.route) {
      line.push(this.route)
      if (this.street_number)
        line.push(this.street_number)
    }
    if (this.locality)
      line.push(this.locality)
    return line
  }

  /**
   * Constructs array of secondary place components
   * @returns {Array}
   */
  Place.prototype.secondaryLine = function() {
    var line = []
    if (this.administrative_area_level_1)
      line.push(this.administrative_area_level_1)
    if (this.country)
      line.push(this.country)
    return line
  }

  return Place
})