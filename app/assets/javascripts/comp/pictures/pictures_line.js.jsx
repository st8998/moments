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
        enhanceRatio: 0.6,
        thumbComponent: Thumb
      }
    },

    render: function() {
      var pics = this.props.pictures

      Picture.fitInRow(pics, this.props.maxWidth, this.props.maxHeight+2)
      Picture.enhanceInRow(pics, this.props.maxWidth, this.props.enhanceRatio)

      var pictures = _.map(pics, function(pic) { return this.props.thumbComponent({picture: pic})}.bind(this))
      var lineHeight = pics[0] ? pics[0].thHeight : this.props.maxHeight

      return (
        <div className='pictures-line-component'>
          <ul style={{height: lineHeight}}>{pictures}</ul>
        </div>
      )
    }
  })

  return PicturesLine
})
