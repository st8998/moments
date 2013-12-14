//= require models/picture

/** @jsx React.DOM */

define('comp/pictures/pictures_panel', ['models/picture'], function(Picture) {

  var Thumbnails = React.createClass({
    getDefaultProps: function() {
      return {onRemove: Function.empty, lineId: 'line'+window.sequence()}
    },

    onRemoveClick: function(pic) {
      this.props.onRemove(pic)
    },

    componentDidMount: function() {
      $('#'+this.props.lineId).sortable({
        tolerance: 'intersect',
        forcePlaceholderSize: true,
        placeholder: 'sort-placeholder'
      })
      $('#'+this.props.lineId).disableSelection()
    },

    componentWillUnmount: function() {
      $('#'+this.props.lineId).sortable('destroy')
    },

    render: function() {
      var thumbnails = this.props.pictures.map(function(pic) {
        return (
          <li style={pic.getThumbStyle()} key={'picture-'+pic._id}>
            <img src={pic.data} style={pic.getThumbStyle()}/>
            <div className='controls'>
              <span onClick={this.onRemoveClick.bind(this, pic)} className='glyphicon glyphicon-trash' />
            </div>
          </li>
        )
      }.bind(this))

      var lineHeight = this.props.pictures[0] ? this.props.pictures[0].thHeight : 0

      return (
        <div className='thumbnails'>
          <ul
            style={{height: lineHeight}}
            className='thumbnails-line'
            id={this.props.lineId}
            key={this.props.lineId}>{thumbnails}
          </ul>
        </div>
      )
    }
  })

  return React.createClass({
    getDefaultProps: function() {
      return {dropzoneId: 'dropzone-'+window.sequence(), pictures: []}
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
        clickable: '#'+this.props.dropzoneId+' .upload-link',
        resize: Picture.resize
      })

      dropzone.on('thumbnail', function(file, data) {
        var pictures = this.state.pictures
        var picture = new Picture({data: data, dzFile: file}).extractDropzoneAttrs(file)
        pictures.push(picture)

        Picture.fitThumbsInRow(pictures)

        this.setState({pictures: pictures})
      }.bind(this))

      this.setState({dropzone: dropzone})
    },

    onPicRemove: function(removedPic) {
      var pictures = _.reject(this.state.pictures, function(pic) { return removedPic === pic })
      Picture.fitThumbsInRow(pictures)

      if (removedPic.dzFile)
        this.state.dropzone.removeFile(removedPic.dzFile)

      console.log(this.state.dropzone.getQueuedFiles())

      this.setState({pictures: pictures})
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
            <h4 className='hint sub-hint'>
              (или <a className='upload-link'>кликните</a> для загрузки)
            </h4>
          </div>
        )
      }


      return (
        <div className='pictures-panel-component panel panel-default' id={this.props.dropzoneId} key={this.props.dropzoneId}>
          <div className='panel-body'>
            <div className='dropzone'>
              {background}
              <Thumbnails onRemove={this.onPicRemove} pictures={this.state.pictures}/>
            </div>
          </div>
        </div>
      )
    }
  })
})