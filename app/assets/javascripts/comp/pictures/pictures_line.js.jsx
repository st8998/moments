//= require models/picture
//= require comp/pictures/picture

/** @jsx React.DOM */

define('comp/pictures/pictures_line', ['models/picture', 'comp/pictures/picture'], function(Picture, Thumb) {

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
