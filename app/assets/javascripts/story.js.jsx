//= require_tree ./components
//= require_tree ./location

/** @jsx React.DOM */

require(['location/select_location', 'location/show_location', 'jquery'], function(SelectLocation, ShowLocation, Routes1) {
  var smileClub = {
    lat: 53.21651837219011,
    lng: 50.15031337738037,
    route: 'Ново-Садовая',
    street_number: '151',
    name: 'Интерсное местечко',
    locality: 'Самара',
    administrative_area_level_1: 'Самарская область',
    country: 'Россия'
  }

  function printAddress(address) {
    console.log(address)
  }

  var Story = React.createClass({
    getInitialState: function() {
      return {address: this.props.address}
    },

    getDefaultProps: function() {
      return {editLocation: false}
    },

    onEditLocation: function() {
      this.setState({editLocation: true})
    },

    onAddressApply: function(address) {
      this.setState({editLocation: false, address: address})
    },

    onAddressCancel: function(address) {
      this.setState({editLocation: false})
    },

    render: function() {
      var locationComponent

      if (this.state.editLocation) {
        locationComponent =
          <SelectLocation address={this.state.address}
          onAddressApply={this.onAddressApply}
          onAddressCancel={this.onAddressCancel} />
      } else {
        locationComponent =
          <ShowLocation
          onEditLocation={this.onEditLocation}
          onAddressApply={this.onAddressApply}
          address={this.state.address} />
      }

      return (
        <div className='story'>
          <h1>STORY IS EDITING HERE</h1>
          <h3>RIGHT NOW</h3>
          <div className='panel panel-default location-container'>
            <div className='panel-body'>
            {locationComponent}
            </div>
          </div>
        </div>
        )
    }
  })

  React.renderComponent(<Story address={smileClub} />, document.querySelector('#content'))
})

