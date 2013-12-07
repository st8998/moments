//= require components/button_group
/** @jsx React.DOM */
(function() {

  var geocoder = new google.maps.Geocoder()

  function geocodeToAddress(geocode, oldAddress) {
    var address = {}

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

    if (oldAddress) {
      address.lat = oldAddress.lat
      address.lng = oldAddress.lng
    } else {
      address.lat = geocode.geometry.location.lat()
      address.lng = geocode.geometry.location.lng()
    }

    return address
  }

  function geometryTypeToZoomLevel(type) {
    switch (type) {
      case 'country':
        return 5
      case 'administrative_area_level_1':
        return 8
      case 'locality':
        return 11
      case 'route':
        return 15
      case 'street_number':
        return 18
      default:
        return 15
    }
  }

  function addressFieldToLabel(fieldName) {
    switch (fieldName) {
      case 'street_number':
        return 'Дом'
      case 'route':
        return 'Улица'
      case 'locality':
        return 'Город'
      case 'administrative_area_level_1':
        return 'Область'
      case 'country':
        return 'Страна'
    }
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
    getDefaultProps: function() {
      return {onLookupAddress: emptyFunction}
    },

    getInitialState: function() {
      return {suggests: []}
    },

    lookupAddress: function(e) {
      e.preventDefault()

      var lookupInput = this.refs.lookupField.getDOMNode()

      if (lookupInput.value) {
        this.props.onLookupAddress(lookupInput.value)
      }
    },

    render: function() {
      return (
        <div className='autocomplete'>
          <form className='panel search-bar' onSubmit={this.lookupAddress}>
            <div className='input-group'>
              <input className='form-control' type='text' ref='lookupField' />
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
    getDefaultProps: function() {
      return {onFieldChange: emptyFunction}
    },

    getInitialState: function() {
      return {value: this.props.value}
    },

    handleClear: function() {
      var input = this.refs.input.getDOMNode()
      input.value = ''
      this.props.onFieldChange(input.name, '')
    },

    handleBlur: function(e) {
      var input = this.refs.input.getDOMNode()
      if (input.value != this.props.value) {
        this.props.onFieldChange(input.name, input.value)
      }
    },

    handleChange: function(event) {
      this.setState({value: event.target.value});
    },

    render: function() {
      return (
        <div className='form-group'>
          <label htmlFor={this.props.field} className='col-sm-2 control-label'>{this.props.label}</label>
          <div className='col-sm-10'>
            <input
              ref='input'
              id={this.props.field}
              name={this.props.field}
              value={this.state.value}
              className='form-control'
              type='text'
              placeholder={this.props.placeholder}
              onBlur={this.handleBlur}
              onChange={this.handleChange} />
            <span className='glyphicon glyphicon-trash button-clear' onClick={this.handleClear} />
          </div>
        </div>
        )
    }
  })

  var Address = React.createClass({
    getDefaultProps: function() {
      return {address: {}, onChange: emptyFunction}
    },

    handleFieldChange: function(field, newValue) {
      var newAddress = Object.clone(this.props.address)
      newAddress[field] = newValue
      this.props.onChange(newAddress)
    },

    render: function() {
      var address = this.props.address
      var fields = ['street_number','route','locality','administrative_area_level_1','country']

      var components = []
      fields.forEach(function(field) {
        if (address[field]) {
          components.push(<AddressComponent key={field+Math.random()} onFieldChange={this.handleFieldChange} value={address[field]} field={field} label={addressFieldToLabel(field)} />)
        }
      }.bind(this))

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

    lookupAddress: function(addressString) {
      geocoder.geocode({'address': addressString, bounds: this.state.map.getBounds()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          this.setState({address: geocodeToAddress(results[0])})

          this.state.map.setCenter(results[0].geometry.location)
          this.state.map.setZoom(geometryTypeToZoomLevel(results[0].types[0]))
          this.state.map.panBy(-150, 0)
        }
      }.bind(this))
    },

    onAddressFieldsChange: function(newAddress) {
      this.setState({address: newAddress})
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
      map.panBy(-150, 0)

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
            <AddressLookup onLookupAddress={this.lookupAddress} />
            <Address address={this.state.address} onChange={this.onAddressFieldsChange} />
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