define('models/address', ['settings'], function(settings) {
  'use strict'

  /**
   * @param {object} [attrs] Initial address components
   * @constructor
   */
  function Address(attrs) {
    for (var attr in attrs)
      this[attr] = attrs[attr]
  }

  Address.fields = ['lat','lng','name','country','administrative_area_level_1','locality','street_number','postal_code','route']

  Address.zoomLevels = {
    country: 5,
    administrative_area_level_1: 8,
    locality: 11,
    route: 15,
    street_number: 18
  }

  Address.prototype.imageUrl = function(props) {
    var defaultProps = {
      key: settings.map.key,
      size: '350x150',
      scale: 1,
      zoom: this.zoomLevel() - 2,
      center: ''+this.lat+','+this.lng,
      sensor: false,
      markers: 'color:red|'+this.lat+','+this.lng
    }

    var queryString = Object.toQueryString(Object.merge(defaultProps, props))
    return 'http://maps.googleapis.com/maps/api/staticmap?' + queryString
  }

  Address.prototype.latLng = function() {
    return new google.maps.LatLng(this.lat, this.lng)
  }

  Address.fromGeocode = function(geocode) {
    var address = new Address()

    geocode.address_components.forEach(function(comp) {
      var type = comp.types[0]

      switch (type) {
        case 'country':
        case 'administrative_area_level_1':
        case 'locality':
        case 'street_number':
        case 'postal_code':
          address[type] = comp.long_name
          break
        // case 'administrative_area_level_2': switched off for now
        case 'route':
          address[type] = comp.short_name
          break
      }
    })

    address.lat = geocode.geometry.location.lat()
    address.lng = geocode.geometry.location.lng()

    return address
  }

  Address.prototype.mergeGeocode = function(geocode) {
    var newAddress = Address.fromGeocode(geocode)

    newAddress.lat = this.lat
    newAddress.lng = this.lng
    newAddress.name = this.name

    return newAddress
  }

  Address.prototype.zoomLevel = function() {
    var smallestComponent =
      ['street_number','route','locality','administrative_area_level_1','country'].
        find(function(component) {return !!this[component]})

    return Address.zoomLevels[smallestComponent]
  }

  // Copy only known fields
  Address.prototype.copy = function() {
    var copy = new Address()
    for (var field in Address.fields)
      copy[field] = this[field]
    return copy
  }

  Address.prototype.primaryLine = function() {
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

  Address.prototype.secondaryLine = function() {
    var line = []
    if (this.administrative_area_level_1)
      line.push(this.administrative_area_level_1)
    if (this.country)
      line.push(this.country)
    return line
  }

  // module export
  return Address
})
