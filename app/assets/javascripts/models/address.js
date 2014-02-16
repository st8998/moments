//define('models/address', ['settings'], function(settings) {
//  'use strict'
//
//  /**
//   * @class Address
//   * @property {Number} lat - latitude
//   * @property {Number} lng - longitude
//   * @property {String} name - name of this place
//   * @property {String} country - country
//   * @property {String} administrative_area_level_1 - region
//   * @property {String} locality - city/village
//   * @property {String} street_number - house number
//   * @property {String} route - name of route
//   * @property {String} postal_code - postal code
//   * @param {object} [attrs] - Initial address components
//   * @constructor
//   */
//  function Address(attrs) {
//    for (var attr in attrs)
//      this[attr] = attrs[attr]
//  }
//
//  Address.fields = ['lat','lng','name','country','administrative_area_level_1','locality','street_number','postal_code','route']
//
//  Address.zoomLevels = {
//    country: 5,
//    administrative_area_level_1: 8,
//    locality: 11,
//    route: 15,
//    street_number: 17
//  }
//
//  /**
//   * Generates url to static google map image representing this address
//   * @param {object} [props]
//   * @see {@link https://developers.google.com/maps/documentation/staticmaps/#URL_Parameters}
//   * @returns {string} image url
//   */
//  Address.prototype.imageUrl = function(props) {
//    var defaultProps = {
//      key: settings.map.key,
//      size: '350x150',
//      scale: 1,
//      zoom: this.zoomLevel() - 1,
//      center: ''+this.lat+','+this.lng,
//      sensor: false,
//      markers: 'color:red|'+this.lat+','+this.lng
//    }
//
//    var queryString = $.param(_.extend(defaultProps, props))
//    return 'http://maps.googleapis.com/maps/api/staticmap?' + queryString
//  }
//
//  /**
//   * Returns google maps LatLng object representing this address
//   * @returns {google.maps.LatLng|undefined} Google map LatLng or nothing if address doesn't have lat/lng
//   */
//  Address.prototype.getLatLng = function() {
//    if (this.lat && this.lng)
//      return new google.maps.LatLng(this.lat, this.lng)
//  }
//
//  /**
//   * Assigns lat/lng properties from Google point
//   * @param latLng {google.maps.LatLng}
//   * @returns {Address} this object for chaining
//   */
//  Address.prototype.setLatLng = function(latLng) {
//    this.lat = latLng.lat()
//    this.lng = latLng.lng()
//    return this
//  }
//
//  Address.fromGeocode = function(geocode) {
//    var address = new Address()
//
//    geocode.address_components.forEach(function(comp) {
//      var type = comp.types[0]
//
//      switch (type) {
//        case 'country':
//        case 'administrative_area_level_1':
//        case 'locality':
//        case 'street_number':
//        case 'postal_code':
//          address[type] = comp.long_name
//          break
//        // case 'administrative_area_level_2': switched off for now
//        case 'route':
//          address[type] = comp.short_name
//          break
//      }
//    })
//
//    address.lat = geocode.geometry.location.lat()
//    address.lng = geocode.geometry.location.lng()
//
//    return address
//  }
//
//  Address.prototype.mergeGeocode = function(geocode) {
//    var newAddress = Address.fromGeocode(geocode)
//
//    newAddress.lat = this.lat
//    newAddress.lng = this.lng
//    newAddress.name = this.name
//
//    return newAddress
//  }
//
//  Address.prototype.zoomLevel = function() {
//    var smallestComponent =
//      _.find(['street_number','route','locality','administrative_area_level_1','country'], function(c) {return !!this[c]}, this)
//
//    return Address.zoomLevels[smallestComponent]
//  }
//
//  /**
//   * Constructs new Address from this instance using only Address.fields attributes
//   * @returns {Address} New Address
//   */
//  Address.prototype.copy = function() {
//    var copy = new Address()
//    Address.fields.forEach(function(field) {copy[field] = this[field]}.bind(this))
//
//    return copy
//  }
//
//  /**
//   * Constructs array of primary address components
//   * @returns {Array}
//   */
//  Address.prototype.primaryLine = function() {
//    var line = []
//    if (this.route) {
//      line.push(this.route)
//      if (this.street_number)
//        line.push(this.street_number)
//    }
//    if (this.locality)
//      line.push(this.locality)
//    return line
//  }
//
//  /**
//   * Constructs array of secondary address components
//   * @returns {Array}
//   */
//  Address.prototype.secondaryLine = function() {
//    var line = []
//    if (this.administrative_area_level_1)
//      line.push(this.administrative_area_level_1)
//    if (this.country)
//      line.push(this.country)
//    return line
//  }
//
//  // module export
//  return Address
//})
