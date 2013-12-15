//= require comp/location/location
//= require comp/pictures/pictures_panel
//= require models/address

/** @jsx React.DOM */

require(
['comp/location/location', 'comp/pictures/pictures_panel', 'models/address', 'models/picture'],
function(Location, PicturesPanel, Address, Picture) {
  var smileClub = new Address({
    lat: 53.21651837219011,
    lng: 50.15031337738037,
    route: 'Ново-Садовая',
    street_number: '151',
    name: 'Интерсное местечко',
    locality: 'Самара',
    administrative_area_level_1: 'Самарская область',
    country: 'Россия'
  })

  function log(data) {
    console.log(data)
  }

  var Story = React.createClass({
    getInitialState: function() {
      return {address: this.props.address, pictures: this.props.pictures}
    },

    getDefaultProps: function() {
      return {address: new Address(), pictures: []}
    },

    render: function() {
      return (
        <div className='story'>
          <h1>STORY IS EDITING HERE</h1>
          <h3>RIGHT NOW</h3>
          <PicturesPanel onPicturesChange={log} pictures={this.state.pictures} />
          <Location address={this.state.address} onAddressChange={log} />
        </div>
        )
    }
  })

  $.get(Routes.pictures_path({format: 'json'}), function(data) {
    var pictures = _.map(data, function(attrs) { return new Picture(attrs) })
    React.renderComponent(<Story address={smileClub} pictures={pictures} />, document.querySelector('#content'))
  }.bind(this))

})

