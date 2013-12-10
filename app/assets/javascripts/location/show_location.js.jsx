/** @jsx React.DOM */
(function() {

  window.ShowLocation = React.createClass({

    render: function() {
      var address

      if (this.props.address) {
        address = <h1>{this.props.address.name}. <a onClick={this.props.onEditLocation}>Edit</a></h1>
      } else {
        address = <h1>No address selected (click here to <a onClick={this.props.onEditLocation}>select</a>)</h1>
      }

      return (
        <div className='show-location-component'>
          {address}
        </div>
        )
    }
  })

}());