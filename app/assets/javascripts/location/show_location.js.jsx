/** @jsx React.DOM */
(function() {

  function addressToZoomLevel(address) {
    var smallestComponent =
      ['street_number','route','locality','administrative_area_level_1','country'].
        find(function(component) {return !!address[component]})

    return window.map.typeToZoom[smallestComponent]
  }

  function addressToImageUrl(address) {
    var props = {
      key: window.map.key,
      size: '350x150',
      scale: 1,
      zoom: addressToZoomLevel(address)-2,
      center: ''+address.lat+','+address.lng,
      sensor: false,
      markers: 'color:red|'+address.lat+','+address.lng
    }

    return 'http://maps.googleapis.com/maps/api/staticmap?' + $.param(props)
  }

  window.ShowLocation = React.createClass({
    getDefaultProps: function() {
      return {onAddressApply: emptyFunction}
    },

    onNameChange: function(e) {
      var address = this.props.address
      address.name = e.target.value

      this.props.onAddressApply(address)
    },

    render: function() {
      var addressComp

      if (this.props.address) {
        var address = this.props.address

        var mainLine = ''
        if (address.route) {
          mainLine += address.route
          if (address.street_number)
            mainLine += (', '+address.street_number)
          if (address.locality)
            mainLine += (', '+address.locality)
        } else {
          mainLine += address.locality
        }
        if (mainLine)
          mainLine = <p className='primary-line'>{mainLine}</p>

        var secondaryLine = ''
        if (address.administrative_area_level_1) {
          secondaryLine += address.administrative_area_level_1
          if (address.country)
            secondaryLine += (', '+address.country)
        } else {
          secondaryLine += address.country
        }
        if (secondaryLine)
          secondaryLine = <p className='secondary-line'>{secondaryLine}</p>

        addressComp =
          <div className='map-with-address'>
            <img className='map' src={addressToImageUrl(this.props.address)} />
            <div className='address'>
              <h3 className='name'>
                <input className='address-name' type='text' placeholder='название'
                  value={address.name}
                  onChange={this.onNameChange} />
              </h3>
              {mainLine}
              {secondaryLine}
              <p><a href='javascript:void(0)' onClick={this.props.onEditLocation}>изменить &rarr;</a></p>
            </div>
          </div>
      } else {
        addressComp = <h3 className='no-address'>Место не указано (нажмите чтобы <a href='javascript:void(0)' onClick={this.props.onEditLocation}>задать</a>)</h3>
      }

      return (
        <div className='show-location-component'>
          {addressComp}
        </div>
        )
    }
  })

}());