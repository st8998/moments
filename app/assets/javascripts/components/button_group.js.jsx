/** @jsx React.DOM */

(function() {
  var cx = React.addons.classSet

  window.ButtonGroup = React.createClass({
    getDefaultProps: function() {
      return {
        onChange: function() {},
        value: '',
        buttons: []
      }
    },

    handleClick: function(newValue) {
      if (newValue != this.props.value)
        this.props.onChange(newValue)
    },

    render: function() {
      var buttons = this.props.buttons.map(function(button) {
        return (
          <button onClick={this.handleClick.bind(this, button.value)} className={cx({'btn btn-default': true, 'active': button.value == this.props.value})}>
            <span className={'glyphicon glyphicon-'+button.glyphicon} />
          </button>
          )
      }.bind(this))

      return (
        <div className='control-panel btn-group panel'>
          {buttons}
        </div>
        )
    }
  })
}())
