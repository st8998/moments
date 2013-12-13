/** @jsx React.DOM */

define('comp/pictures/pictures_panel', [], function() {

  return React.createClass({
    getDefaultProps: function() {
      return {dropzoneId: 'dropzone-'+sequence()}
    },

    componentDidMount: function() {
      var dropzone = new Dropzone('#'+this.props.dropzoneId, {
        autoProcessQueue: false, url: '/',
        dictDefaultMessage:''})
    },

    render: function() {
      return (
        <div className='pictures-panel-component panel panel-default'>
          <div className='panel-body'>
            <div className='dropzone' id={this.props.dropzoneId}>
              <div className='background'>
                <h3 className='hint'>Бросайте сюда свои фотки</h3>
                <h4 className='hint sub-hint'>(или кликните для загрузки)</h4>
                <span className='glyphicon glyphicon-circle-arrow-down' />
              </div>
            </div>
          </div>
        </div>
      )
    }
  })
})