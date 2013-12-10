//= require location/select_location
//= require location/show_location
/** @jsx React.DOM */
var smileClub = {
  lat: 53.21651837219011,
  lng: 50.15031337738037,
  route: 'Ново-Садовая',
  street_number: '151'
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
      locationComponent = <ShowLocation onEditLocation={this.onEditLocation} address={this.state.address} />
    }

    return (
      <div className='story'>
        <h1>STORY IS EDITING HERE</h1>
        <h3>RIGHT NOW</h3>
        <div className='panel panel-default'>
          <div className='panel-body'>
            {locationComponent}
          </div>
        </div>
      </div>
      )
  }
})

React.renderComponent(<Story />, document.querySelector('#content'))
