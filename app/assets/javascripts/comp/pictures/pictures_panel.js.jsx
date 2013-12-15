//= require models/picture

/** @jsx React.DOM */

define('comp/pictures/pictures_panel', ['models/picture'], function(Picture) {
  var cx = React.addons.classSet

  var Thumbnails = React.createClass({
    getDefaultProps: function() {
      return {onRemove: Function.empty, lineId: 'line'+window.sequence()}
    },

    onRemoveClick: function(pic) {
      this.props.onRemove(pic)
    },

    render: function() {
      var thumbnails = this.props.pictures.map(function(pic) {
        var img, progress
        if (pic.getUrl()) {
          img = <img src={pic.getUrl()} style={pic.getImageStyle()}/>
        } else if (pic.data) {
          img = <img src={pic.data} style={pic.getImageStyle()}/>
        }
//        else {
//          img = (
//            <div className='no-image' style={pic.getThumbStyle()}>
//              <span className='helper' />
//              <img src='/assets/no_image_thumb.png' />
//            </div>
//          )
//        }

        if (pic.progress)
          progress = <div className='upload-progress' style={{height: 100-pic.progress+'%', top: pic.progress+'%'}} />

        if (img)
          return (
            <li style={pic.getContainerStyle()} key={pic.uiId}>
              {img}
              {progress}
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
      return {dropzoneId: 'dropzone-'+window.sequence(), pictures: [], onPicturesChange: Function.empty}
    },

    getInitialState: function() {
      if (this.props.pictures)
        Picture.fitThumbsInRow(this.props.pictures)

      return {pictures: this.props.pictures}
    },

    componentDidMount: function() {
      var dropzone = new Dropzone('#'+this.props.dropzoneId, {
        paramName: 'picture[image]',
        url: Routes.pictures_path(),
        autoProcessQueue: true,
        dictDefaultMessage:'',
        previewTemplate: '<span></span>',
        clickable: '#'+this.props.dropzoneId+' .background',
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

          Picture.fitThumbsInRow(pictures)

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
        console.log('success')

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

          Picture.fitThumbsInRow(pictures)

          this.setState({pictures: pictures})
          this.props.onPicturesChange(_.filter(pictures, function(pic) { return pic.id }))
        }
      }.bind(this))

      this.setState({dropzone: dropzone})
    },

    onPicRemove: function(removedPic) {
      var pictures = _.reject(this.state.pictures, function(pic) { return removedPic === pic })
      Picture.fitThumbsInRow(pictures)

      if (removedPic.id)
        $.ajax({url: Routes.picture_path(removedPic.id), method: 'delete'})

      if (removedPic.dzFile)
        this.state.dropzone.removeFile(removedPic.dzFile)

      this.setState({pictures: pictures})
      this.props.onPicturesChange(_.filter(pictures, function(pic) { return pic.id }))
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
      } else {
        background = <div className='background' />
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