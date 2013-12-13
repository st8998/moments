//= require comp/common/button_group

/** @jsx React.DOM */
define('comp/location/select_location',
  ['settings', 'comp/common/button_group', 'models/address'],
  function(settings, ButtonGroup, Address) {

  var geocoder = new google.maps.Geocoder()
  var cx = React.addons.classSet

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
      return {onLookupAddress: Function.empty}
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
        <div className='autocomplete address-lookup'>
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
      return {onFieldChange: Function.empty}
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

  var AddressComp = React.createClass({
    getDefaultProps: function() {
      return {address: new Address(), onChange: Function.empty, minimized: false}
    },

    handleFieldChange: function(field, newValue) {
      var newAddress = this.props.address.copy()
      newAddress[field] = newValue
      this.props.onChange(newAddress)
    },

    handleNameChange: function(e) {
      var nameInput = e.target

      if (nameInput.value != this.props.address.name)
        this.handleFieldChange('name', nameInput.value)
    },

    render: function() {
      var address = this.props.address
      var fields = ['street_number','route','locality','administrative_area_level_1','country']

      var components = []
      fields.forEach(function(field) {
        if (address[field]) {
          components.push(
            <AddressComponent
            key={'address-'+field+'-'+address[field]}
            value={address[field]} label={addressFieldToLabel(field)}
            field={field} onFieldChange={this.handleFieldChange} />
          )
        }
      }.bind(this))

      var show
      if (this.props.minimized && address) {
        var addressLine = []
        if (address.name) {
          show = <div className='address-minimized'>
            <span className='address-name'>{address.name}</span>,
            <span className='address-primary-line'>{address.primaryLine().join(', ')}</span>
          </div>
        } else {
          show = <span className='address-primary-line'>{address.primaryLine().join(', ')}</span>
        }
      } else {
        show = <input onBlur={this.handleNameChange} className='form-control name' defaultValue={address.name} type='text' placeholder='название' name='name' />
      }

      return (
        <form className={cx({'panel address form-horizontal': true, 'minimized': this.props.minimized})}
          onClick={this.props.onFocus}>
          <div className='panel-heading'>
            {show}
          </div>
          <div className='panel-body'>
            {components}
          </div>

          {this.props.children}
        </form>
        )
    }
  })

  var SelectLocation = React.createClass({
    getInitialState: function() {
      return {address: this.props.address.copy(), mapMode: this.props.mapMode, sidePanelMinimized: true}
    },

    getDefaultProps: function() {
      return {
        address: new Address(),
        onAddressApply: Function.empty,
        onAddressCancel: Function.empty,
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

      address.setLatLng(e.latLng)
      this.setState({address: address, mapMode: 'move'})

      this.state.map.setCenter(e.latLng)
      this.state.map.panBy(-150, 0)

      geocoder.geocode({'latLng': e.latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var address = this.state.address.mergeGeocode(results[0])
          this.setState({address: address, sidePanelMinimized: false})
        }
      }.bind(this))
    },

    lookupAddress: function(addressString) {
      geocoder.geocode({'address': addressString, bounds: this.state.map.getBounds()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var address = Address.fromGeocode(results[0])

          this.setState({address: address, sidePanelMinimized: false})

          this.state.map.setCenter(address.getLatLng())
          this.state.map.setZoom(address.zoomLevel())
          this.state.map.panBy(-150, 0)
        }
      }.bind(this))
    },

    onAddressFieldsChange: function(newAddress) {
      this.setState({address: newAddress})
    },

    componentDidMount: function() {
      var comp = this
      var map = new google.maps.Map(this.refs.map.getDOMNode(), this.props.mapOptions)
      var marker = new google.maps.Marker({
        map: map,
        title: this.state.address.name,
        draggable: true
      })

      var address = this.state.address
      if (address.lat && address.lng) {
        map.setCenter(address.getLatLng())
      } else {
        map.setCenter(this.props.mapCenter)
      }
      map.panBy(-150, 0)

      this.addMarkerHandle = google.maps.event.addListener(map, 'click', function(e) {
        if (comp.state.mapMode == 'marker') {
          comp.handleAddressPosition(e)
        }
      })

      this.minimizePanelHandle = google.maps.event.addListener(map, 'dragstart', function() {
        comp.setState({sidePanelMinimized: true})
      })

      this.markerDragHandle = google.maps.event.addListener(marker, 'dragend', this.handleAddressPosition)
      this.markerClickHandle = google.maps.event.addListener(marker, 'click', function(e) {
        comp.setState({sidePanelMinimized: false})
        comp.state.map.setCenter(e.latLng)
        comp.state.map.panBy(-150, 0)
      })

      comp.setState({map: map, marker: marker})
    },

    componentWillUnmount: function() {
      google.maps.event.removeListener(this.markerDragHandle)
      google.maps.event.removeListener(this.markerClickHandle)
      google.maps.event.removeListener(this.addMarkerHandle)
      google.maps.event.removeListener(this.minimizePanelHandle)
    },

    componentDidUpdate: function() {
      var address = this.state.address

      // adjust marker
      this.state.marker.setTitle(address.name)
      if (address.lat && address.lng) {
        this.state.marker.setPosition(address.getLatLng())
      }

      // adjust map pointer
      this.state.map.setOptions({draggableCursor: this.state.mapMode == 'move' ? null : 'crosshair'})
    },

    changeMapMode: function(newMode) {
      this.setState({mapMode: newMode})
    },

    handleAddressFocus: function() {
      this.setState({sidePanelMinimized: false})

      var address = this.state.address
      if (address.lat && address.lng) {
        this.state.map.setCenter(address.getLatLng())
        this.state.map.panBy(-150, 0)
      }
    },

    handleAddressApply: function() {
      this.props.onAddressApply(this.state.address)
    },
    handleAddressCancel: function() {
      this.props.onAddressCancel(this.props.address)
    },

    render: function() {
      var canApplyAddress = this.state.address.lat && this.state.address.lng

      return (
        <div className='select-location-component'>
          <div className='map' ref='map'></div>
          <div className='side-panel'>
            <AddressLookup onLookupAddress={this.lookupAddress} />

            <AddressComp address={this.state.address} minimized={this.state.sidePanelMinimized}
            onChange={this.onAddressFieldsChange}
            onFocus={this.handleAddressFocus}>
              <div className='apply-address-buttons' onFocus={Function.stopPropagation}>
                <button onClick={this.handleAddressApply} disabled={!canApplyAddress} type='button' className='btn btn-primary btn-sm'>Use this address</button>
                <button onClick={this.handleAddressCancel} type='button' className='btn btn-default btn-sm'>Cancel</button>
              </div>
            </AddressComp>
          </div>
          <ButtonGroup
          onChange={this.changeMapMode}
          value={this.state.mapMode}
          buttons={this.props.mapControls}/>
        </div>
        )
    }
  })

  return SelectLocation
})
