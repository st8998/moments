//= require comp/pictures/picture
//= require comp/pictures/pictures_line
//= require models/picture

/** @jsx React.DOM */

define('comp/pictures/pictures_uploader',
  ['models/picture',
    'comp/pictures/picture',
    'comp/pictures/pictures_line'],
function(Picture, Thumb, Thumbnails) {

  var EditableThumb = React.createClass({
    render: function() {

      var pic = this.props.picture, progress

      if (pic.progress)
        progress = <div className='progress' style={{height: 100-pic.progress+'%', top: pic.progress+'%'}} />

      return this.transferPropsTo(
        <Thumb>
          {progress}
          <div className='controls'>
            <span onClick={this.props.onRemove.bind(this, pic)} className='glyphicon glyphicon-trash' />
          </div>
        </Thumb>
      )

    }
  })

  var Placeholder = React.createClass({
    render: function() {
      if (!this.props.pictures.length) {
        return (
          <div className='background'>
            <span className='glyphicon glyphicon-cloud-upload' />
            <h3 className='hint'>Тащите и бросайте сюда свои фотки</h3>
            <h4 className='hint sub-hint'>
            (или <a className='upload-link'>кликните</a> для загрузки)
            </h4>
          </div>
          )
      } else {
        return <div className='background' />
      }
    }
  })

  return React.createClass({
    getDefaultProps: function() {
      return {pictures: [], onPicturesChange: Function.empty}
    },

    getInitialState: function() {
      return {pictures: this.props.pictures, dropzoneId: window.sequence('dropzone')}
    },

    componentDidMount: function() {
      var dropzone = new Dropzone('#'+this.state.dropzoneId, {
        paramName: 'image',
        url: '/api/v1/'+this.props.accountKey+'/pictures/upload',
        autoProcessQueue: true,
        dictDefaultMessage:'',
        previewTemplate: '<span></span>',
        clickable: '#'+this.state.dropzoneId+' .background',
        resize: Picture.resize
      })

      dropzone.on('addedfile', function(file) {
        var pictures = this.state.pictures
        var picture = new Picture({dzFile: file}).extractDropzoneAttrs(file)
        pictures.push(picture)

        this.setState({pictures: pictures})
      }.bind(this))

      dropzone.on('thumbnail', function(file, data) {
        var pictures = this.state.pictures
        var picture = _.find(pictures, function(pic) { return pic.dzFile === file })

        // on fast upload speed thumbnail can be generated after upload finish
        // do nothing in this case
        if (picture) {
          picture.image_data = data
          picture.progress = 0.01 // trick to force progress be truthy value
          picture.extractDropzoneAttrs(file)

          this.setState({pictures: pictures})
        }
      }.bind(this))

      dropzone.on('uploadprogress', function(file, progress) {
        var pictures = this.state.pictures
        var picture = _.find(pictures, function(pic) { return pic.dzFile === file })

        // uer can remove photo before upload will be finished
        if (picture) {
          picture.progress = progress
          this.setState({pictures: pictures})
        }
      }.bind(this))

      dropzone.on('success', function(file, picAttrs) {
        var pictures = this.state.pictures
        var picture = _.find(pictures, function(pic) { return pic.dzFile === file })

        // uer can remove photo before upload will be finished
        if (picture) {
          // remove any progress elements
          delete picture.progress

          // remove temporary thumbnail data
          delete picture.image_data

          // remove dropzone file info
          delete picture.dzFile

          picture.assignAttributes(picAttrs)

          this.setState({pictures: pictures})
          this.props.onPicturesChange(_.filter(pictures, function(pic) { return pic.id }))
        }
      }.bind(this))

      this.setState({dropzone: dropzone})
    },

    componentWillUnmount: function() {
      this.state.dropzone.destroy()
    },

    onPictureRemove: function(removedPic) {
      var pictures = _.reject(this.state.pictures, function(pic) { return removedPic === pic })

      if (removedPic.id)
        $.ajax({url: '/api/v1/'+this.props.accountKey+'/pictures/'+removedPic.id, method: 'delete'})

      if (removedPic.dzFile)
        this.state.dropzone.removeFile(removedPic.dzFile)

      this.setState({pictures: pictures})
      this.props.onPicturesChange(_.filter(pictures, function(pic) { return pic.id }))
    },

    render: function() {
      var
        comp = this,
        thumbClass = function(attrs) {return EditableThumb(_.extend(attrs, {onRemove: comp.onPictureRemove}))}

      return (
        <div className='pictures-uploader-component dropzone' id={this.state.dropzoneId} key={this.state.dropzoneId}>
          <Thumbnails
            pictures={this.state.pictures} thumbComponent={thumbClass}
            maxWidth={this.props.maxWidth} maxHeight={this.props.maxHeight}
            enhanceRatioWidth={this.props.enhanceRatioWidth}
            enhanceRatioHeight={this.props.enhanceRatioHeight} />
          <Placeholder pictures={this.state.pictures} />
        </div>
      )
    }

  })
})