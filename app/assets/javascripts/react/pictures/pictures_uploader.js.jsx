/** @jsx React.DOM */

angular.module('app').factory('PicturesUploaderReact',
  ['ThumbReact', 'PicturesLineReact', 'ProgressReact', 'Picture', 'sequence', 'api',
  function(Thumb, Thumbnails, Progress, Picture, seq, api) {

  var EditableThumb = React.createClass({
    render: function() {
      var pic = this.props.picture

      return this.transferPropsTo(
        <Thumb>
          <Progress progress={pic.progress} />
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
      return {pictures: this.props.pictures, dropzoneId: seq('dropzone'), progress: 0}
    },

    componentDidMount: function() {
      var dropzone = new Dropzone('#'+this.state.dropzoneId, {
        paramName: 'image',
        url: api('/pictures/upload'),
        autoProcessQueue: false,
        dictDefaultMessage: '',
        previewTemplate: '<span></span>',
        clickable: '#'+this.state.dropzoneId+' .background',
        resize: Picture.resize
      })

      dropzone.on('addedfile', function(file) {
        this.setState({progress: this.state.progress + 1})
      }.bind(this))

      dropzone.on('thumbnail', function(file, data) {
        var pictures = this.state.pictures
        var picture = new Picture({dzFile: file}).extractDropzoneAttrs(file)
        pictures.push(picture)

        picture.image_data = data
        picture.progress = 0
        picture.extractDropzoneAttrs(file)

        this.setState({pictures: pictures, progress: this.state.progress - 1})

        this.state.dropzone.processFile(file)
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
        } else {
          // TODO remove direct api calls
          $.ajax({url: api('/pictures', picAttrs.id), method: 'delete'})
        }
      }.bind(this))

      this.setState({dropzone: dropzone})
    },

    componentWillUnmount: function() {
      this.state.dropzone.destroy()
    },

    onPictureRemove: function(removedPic) {
      var pictures = _.reject(this.state.pictures, function(pic) { return removedPic === pic })

      // TODO remove direct api calls
      if (removedPic.id)
        $.ajax({url: api('/pictures/', removedPic.id), method: 'delete'})

      if (removedPic.dzFile) {
        this.state.dropzone.removeFile(removedPic.dzFile)
      }

      this.setState({pictures: pictures})
      this.props.onPicturesChange(_.filter(pictures, function(pic) { return pic.id }))
    },

    render: function() {
      var comp = this,
          thumbClass = function(attrs) {return EditableThumb(_.extend(attrs, {onRemove: comp.onPictureRemove}))}

      return (
        <div className='pictures-uploader-component dropzone' id={this.state.dropzoneId} key={this.state.dropzoneId}>
          <Thumbnails
            pictures={this.state.pictures} thumbComponent={thumbClass}
            maxWidth={this.props.maxWidth} maxHeight={this.props.maxHeight}
            enhanceRatioWidth={this.props.enhanceRatioWidth}
            enhanceRatioHeight={this.props.enhanceRatioHeight} />
          <Placeholder pictures={this.state.pictures} />
          <Progress progress={this.state.progress > 0 ? 'unknown' : undefined} />
        </div>
      )
    }

  })
}])