//= require comp/pictures/pictures_panel
//= require models/address

/** @jsx React.DOM */

require(
['comp/pictures/pictures_panel', 'models/address'],
function(PicturesPanel, Address) {
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

  var Story = React.createClass({
    getInitialState: function() {
      return {address: this.props.address}
    },

    getDefaultProps: function() {
      return {address: new Address()}
    },

    render: function() {
      return (
        <div className='story'>
          <h1>STORY IS EDITING HERE</h1>
          <h3>RIGHT NOW</h3>
          <PicturesPanel />
        </div>
        )
    }
  })

  React.renderComponent(<Story />, document.querySelector('#content'))
})

