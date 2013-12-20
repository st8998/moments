//= require models/picture

/** @jsx React.DOM */

define('comp/pictures/pictures_line', ['models/picture'], function(Picture) {

  var ProgressMixin = {
    renderProgress: function(progress) {
      if (progress !== undefined)
        return <div className='progress' style={{height: 100-progress+'%', top: progress+'%'}} />
    }
  }

  var Thumb = React.createClass({
    mixins: [ProgressMixin],

    getDefaultProps: function() {
      return {picture: new Picture()}
    },

    render: function() {
      var pic = this.props.picture

      return (
        <li style={pic.getContainerStyle()} key={pic.uiId}>
          <img src={pic.getUrl()} style={pic.getImageStyle()} />
          {this.renderProgress(pic.progress)}
        </li>
        )
    }
  })

  var PicturesLine = React.createClass({
    getDefaultProps: function() {
      return {
        pictures: [],
        maxWidth: 800,
        maxHeight: 500,
        enhanceRatio: 0.6
      }
    },

    render: function() {
      var pics = this.props.pictures

      Picture.fitInRow(pics, this.props.maxWidth, this.props.maxHeight+2)
      Picture.enhanceInRow(pics, this.props.maxWidth, this.props.enhanceRatio)

      var pictures = pics.map(function(pic) {
        return <Thumb picture={pic} />
      })
      var lineHeight = this.props.pictures[0] ? this.props.pictures[0].thHeight : 0

      return (
        <div className='pictures-line-component'>
          <ul
            style={{height: lineHeight}}
            className='thumbnails-line'>

            {pictures}
          </ul>
        </div>
      )
    }
  })

  return PicturesLine
})
