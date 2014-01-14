/** @jsx React.DOM */

angular.module('app').constant('ThumbReact',
  React.createClass({
    render: function() {
      var pic = this.props.picture

      return (
        <li style={pic.getContainerStyle()}>
          <img src={pic.getUrl()} style={pic.getImageStyle()} />
          {this.props.children}
        </li>
      )
    }
  }))