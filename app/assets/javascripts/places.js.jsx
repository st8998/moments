//= require components/button_group
/** @jsx React.DOM */
(function() {

  var geocoder = new google.maps.Geocoder()

  function geocodeToAddress(geocode, mutableAddress) {
    var address = mutableAddress || {}

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

    console.log(address)

    return address
  }

  var SuggestsList = React.createClass({
    getDefaultProps: function() {
      return {suggests: []}
    },

    render: function() {
      var items = this.props.suggests.map(function(sugg) {
        return <li>{sugg}</li>
      })

      return (
        <ul className='suggestions panel'>
          {items}
        </ul>
        )
    }
  })

  var AddressLookup = React.createClass({
    getInitialState: function() {
      return {suggests: []}
    },

    render: function() {
      return (
        <div className='autocomplete'>
          <form className='panel search-bar'>
            <div className='input-group'>
              <input className='form-control' type='text' />
              <div className='input-group-btn'>
                <button className='btn btn-primary'>
                  <span className='glyphicon glyphicon-search' />
                </button>
              </div>
            </div>
          </form>
          <SuggestsList suggests={this.state.suggests} />
        </div>
        )
    }
  })

  var AddressComponent = React.createClass({
    render: function() {
      return (
        <div className='form-group'>
          <label htmlFor={this.props.field} className='col-sm-2 control-label'>{this.props.label}</label>
          <div className='col-sm-10'>
            <input value={this.props.value} type='text' className='form-control' id={this.props.field} placeholder={this.props.placeholder} />
          </div>
        </div>
        )
    }
  })

  var Address = React.createClass({
    getDefaultProps: function() {
      return {address: {}}
    },

    render: function() {
      var address = this.props.address
      var components = []
      if (address.street_number)
        components.push(<AddressComponent value={address.street_number} field='street_number' label='Дом' />)
      if (address.route)
        components.push(<AddressComponent value={address.route} field='route' label='Улица' />)
      if (address.locality)
        components.push(<AddressComponent value={address.locality} field='locality' label='Город' />)
      if (address.administrative_area_level_1)
        components.push(<AddressComponent value={address.administrative_area_level_1} field='administrative_area_level_1' label='Область' />)
      if (address.country)
        components.push(<AddressComponent value={address.country} field='country' label='Страна' />)
//      if (address.lat || address.lng)
//        components.push(<AddressComponent value={address.lat + '|' + address.lng} field='larlng' label='Координаты' />)

      return (
        <form className='panel address form-horizontal'>
          <div className='panel-heading'>
            <input className='form-control name' defaultValue={address.name} type='text' placeholder='Название' name='name' />
          </div>
          <div className='panel-body'>
            {components}
          </div>
        </form>
        )
    }
  })

  var Location = React.createClass({
    getInitialState: function() {
      return {address: this.props.address || {}, mapMode: this.props.mapMode}
    },

    getDefaultProps: function() {
      return {
        mapCenter: new google.maps.LatLng(53.21651837219011, 50.15031337738037),
        mapOptions: {
          zoom: 12,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false
        },
        mapMode: 'move',
        mapControls: [
          {glyphicon: 'move', value: 'move'},
          {glyphicon: 'map-marker', value: 'marker'}
        ]
      }
    },

    handleAddressPosition: function(e) {
      var address = this.state.address
      address.lat = e.latLng.lat()
      address.lng = e.latLng.lng()
      this.setState({address: address, mapMode: 'move'})

      geocoder.geocode({'latLng': e.latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
          this.setState({address: geocodeToAddress(results[0], this.state.address)})
      }.bind(this))
    },

    componentDidMount: function() {
      var locationComponent = this
      var map = new google.maps.Map(this.refs.map.getDOMNode(), this.props.mapOptions)
      var marker = new google.maps.Marker({
        map: map,
        title: this.state.address.name,
        draggable: true
      })
      map.setCenter(this.props.mapCenter)

      this.addMarkerHandle = google.maps.event.addListener(map, 'click', function(e) {
        if (locationComponent.state.mapMode == 'marker')
          locationComponent.handleAddressPosition(e)
      })

      this.markerHandle = google.maps.event.addListener(marker, 'dragend', this.handleAddressPosition)

      locationComponent.setState({map: map, marker: marker})
    },

    componentWillUnmount: function() {
      google.maps.event.removeListener(this.markerHandle)
      google.maps.event.removeListener(this.addMarkerHandle)
    },

    componentDidUpdate: function() {
      // adjust marker
      this.state.marker.setTitle(this.state.address.name)
      this.state.marker.setPosition(new google.maps.LatLng(this.state.address.lat, this.state.address.lng))

      // adjust map pointer
      this.state.map.setOptions({draggableCursor: this.state.mapMode == 'move' ? null : 'crosshair'})
    },

    changeMapMode: function(newMode) {
      this.setState({mapMode: newMode})
    },

    render: function() {
      return (
        <div className='location-component'>
          <div className='map' ref='map'></div>
          <div className='side-panel'>
            <AddressLookup />
            <Address address={this.state.address} />
          </div>
          <ButtonGroup
            onChange={this.changeMapMode}
            value={this.state.mapMode}
            buttons={this.props.mapControls}/>
        </div>
        )
    }
  })

  var smileClub = {
    lat: 53.21651837219011,
    lng: 50.15031337738037,
    name: 'Киноклуб "улыбка"',
    route: 'Ново-Садовая',
    street_number: '151'
  }

  React.renderComponent(<Location address={smileClub}/>, document.querySelector('#content .panel-body'))

}());