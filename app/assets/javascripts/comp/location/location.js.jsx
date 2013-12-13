//= require comp/location/select_location
//= require comp/location/show_location
//= require models/address

/** @jsx React.DOM */

define('comp/location/location',
  ['comp/location/select_location',
    'comp/location/show_location',
    'models/address'],
  function(SelectLocation, ShowLocation, Address) {
    return React.createClass({
      getInitialState: function() {
        return {address: this.props.address}
      },

      getDefaultProps: function() {
        return {edit: false, address: new Address(), onAddressChange: Function.empty}
      },

      onEditLocation: function() {
        this.setState({edit: true})
      },

      onAddressApply: function(address) {
        this.setState({edit: false, address: address})
        this.props.onAddressChange(address)
      },

      onAddressCancel: function(address) {
        this.setState({edit: false})
      },

      render: function() {
        var locationComponent

        if (this.state.edit) {
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
          <div className='panel panel-default location-component'>
            <div className='panel-body'>
              {locationComponent}
            </div>
          </div>
        )
      }
    })
  })

