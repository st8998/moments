////= require comp/location/location
////= require comp/pictures/pictures_line
////= require models/address
//
///** @jsx React.DOM */
//
//require(
//['comp/pictures/pictures_panel', 'models/address', 'models/picture', 'comp/pictures/pictures_line'],
//function(PicturesPanel, Address, Picture, PicturesLine) {
//
//  var accountKey = Cookies.get('akey')
//  var smileClub = new Address({
//    lat: 53.21651837219011,
//    lng: 50.15031337738037,
//    route: 'Ново-Садовая',
//    street_number: '151',
//    name: 'Интерсное местечко',
//    locality: 'Самара',
//    administrative_area_level_1: 'Самарская область',
//    country: 'Россия'
//  })
//
//  function log(data) {
//    console.log(data)
//  }
//
//  var Story = React.createClass({
//    getInitialState: function() {
//      return {address: this.props.address, pictures: this.props.pictures}
//    },
//
//    getDefaultProps: function() {
//      return {address: new Address(), pictures: []}
//    },
//
//    render: function() {
//      return (
//        <div className='story'>
//          <h1>STORY IS EDITING HERE</h1>
//          <h3>RIGHT NOW</h3>
//          <div className='pictures-panel-component panel panel-default' id={this.props.dropzoneId} key={this.props.dropzoneId}>
//            <div className='panel-body'>
//              <PicturesLine pictures={this.state.pictures} maxHeight={200} maxWidth={800} enhanceRatio={0.2} />
//            </div>
//          </div>
//        </div>
//        )
//    }
//  })
//
//  $.get('/api/v1/'+accountKey+'/pictures', function(data) {
//    var pictures = _.map(data, function(attrs) { return new Picture(attrs) })
//    React.renderComponent(<Story pictures={pictures} />, document.querySelector('#content'))
//  }.bind(this))
//
//})

