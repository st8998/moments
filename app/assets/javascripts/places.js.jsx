/** @jsx React.DOM */
(function() {

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
      if (address.country)
        components.push(<AddressComponent value={address.country} field='country' label='Страна' />)
      if (address.lat || address.lng)
        components.push(<AddressComponent value={address.lat + '|' + address.lng} field='larlng' label='Координаты' />)

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
      return {address: this.props.address || {}}
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
        }
      }
    },

    componentDidMount: function() {
      var location = this
      var map = new google.maps.Map(this.refs.map.getDOMNode(), this.props.mapOptions)
      var marker = new google.maps.Marker({
        map: map,
        title: this.state.address.name,
        draggable: true
      })
      map.setCenter(this.props.mapCenter)

      this.markerHandle =
        google.maps.event.addListener(marker, 'dragend', function(e) {
          var address = location.state.address
          address.lat = e.latLng.lat()
          address.lng = e.latLng.lng()
          location.setState({address: address})
        })
      location.setState({map: map, marker: marker})
    },

    componentWillUnmount: function() {
      google.maps.event.removeListener(this.markerHandle)
    },

    componentDidUpdate: function() {
      this.state.marker.setTitle(this.state.address.name)
      this.state.marker.setPosition(new google.maps.LatLng(this.state.address.lat, this.state.address.lng))
    },

    render: function() {
      return (
        <div className='location-component'>
          <div className='map' ref='map'></div>
          <div className='side-panel'>
            <AddressLookup />
            <Address address={this.state.address} />
          </div>
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