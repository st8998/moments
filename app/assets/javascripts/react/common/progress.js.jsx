/** @jsx React.DOM */

angular.module('app').constant('ProgressReact',
  React.createClass({
    render: function() {
      var progress = this.props.progress

      if (progress === 'unknown') {
        return <div className='progress' style={{'transition-duration': 0, height: '100%', top: '0'}} />
      } else if (progress !== undefined) {
        return <div className='progress' style={{height: 100-progress+'%', top: progress+'%'}} />
      } else {
        return <div />
      }
    }
  })
)