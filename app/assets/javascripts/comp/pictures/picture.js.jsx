/** @jsx React.DOM */

define('comp/pictures/picture', ['models/picture'], function(Picture) {

  return React.createClass({
    getDefaultProps: function() {
      return {picture: new Picture()}
    },

    render: function() {
      var pic = this.props.picture

      return (
        <li style={pic.getContainerStyle()}>
          <img src={pic.getUrl()} style={pic.getImageStyle()} />
          {this.props.children}
        </li>
        )
    }
  })

})