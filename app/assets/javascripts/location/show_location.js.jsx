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
      size: '384x125',
      scale: 2,
      zoom: addressToZoomLevel(address)-2,
      center: ''+address.lat+','+(address.lng-0.002),
      sensor: false,
      markers: 'color:red|'+address.lat+','+address.lng
    }

    return 'http://maps.googleapis.com/maps/api/staticmap?' + $.param(props)
  }

  console.log()

  window.ShowLocation = React.createClass({

    render: function() {
      var addressComp

      if (this.props.address) {
        addressComp =
          <div>
            <h1>{this.props.address.name}. <a onClick={this.props.onEditLocation}>Edit</a></h1>
            <img className='map' src={addressToImageUrl(this.props.address)} />
          </div>
      } else {
        addressComp = <h1>No address selected (click here to <a onClick={this.props.onEditLocation}>select</a>)</h1>
      }

      return (
        <div className='show-location-component'>
          {addressComp}
        </div>
        )
    }
  })

}());