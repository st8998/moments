//= require models/picture

/** @jsx React.DOM */

define('comp/pictures/pictures_panel', ['models/picture'], function(Picture) {

  var Thumbnails = React.createClass({
    render: function() {
      var thumbnails = this.props.pictures.map(function(pic) {
        return (
          <img src={pic.data} style={pic.getThumbStyle()}/>
        )
      })

      return (
        <div className='thumbnails'>
          <div className='thumbnails-line'>{thumbnails}</div>
        </div>
      )
    }
  })

  return React.createClass({
    getDefaultProps: function() {
      return {dropzoneId: 'dropzone-'+sequence(), pictures: []}
    },

    getInitialState: function() {
      return {pictures: this.props.pictures}
    },

    componentDidMount: function() {
      var dropzone = new Dropzone('#'+this.props.dropzoneId, {
        url: '/',
        autoProcessQueue: false,
        dictDefaultMessage:'',
        previewTemplate: '<span></span>',
        clickable: '#'+this.props.dropzoneId+' .background',
        resize: Picture.resize
      })

      dropzone.on('thumbnail', function(file, data) {
        var pictures = this.state.pictures
        var picture = new Picture({data: data}).extractDropzoneAttrs(file)
        pictures.push(picture)

        Picture.fitThumbsInRow(pictures)

        this.setState({pictures: pictures})
      }.bind(this))

      this.setState({dropzone: dropzone})
    },

    componentWillUnmount: function() {
      this.state.dropzone.destroy()
    },

    render: function() {
      var background

      if (!this.state.pictures.length) {
        background = (
          <div className='background'>
            <span className='glyphicon glyphicon-cloud-upload' />
            <h3 className='hint'>Тащите и бросайте сюда свои фотки</h3>
            <h4 className='hint sub-hint'>(или кликните для загрузки)</h4>
          </div>
        )
      }


      return (
        <div className='pictures-panel-component panel panel-default'>
          <div className='panel-body'>
            <div className='dropzone' id={this.props.dropzoneId} key={this.props.dropzoneId}>
              {background}
              <Thumbnails pictures={this.state.pictures}/>
            </div>
          </div>
        </div>
      )
    }
  })
})