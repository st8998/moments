/** @jsx React.DOM */
(function() {

  window.ShowLocation = React.createClass({

    render: function() {
      return (
        <div className='show-location-component' onClick={this.props.onEditLocation} >
          <h1>CLICK SOMEWHERE TO EDIT LOCATION</h1>
        </div>
        )
    }

  })

}());