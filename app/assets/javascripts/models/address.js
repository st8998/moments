define('models/address', [], function() {
  function Address() {}

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

  // module export
  return Address
})
