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
        enhanceRatioWidth: 0.6,
        enhanceRatioHeight: 0.9,
        thumbComponent: Thumb
      }
    },

    render: function() {
      var pics = this.props.pictures, placeholder

      Picture.fitInRow(pics, this.props.maxWidth, this.props.maxHeight+2)
      Picture.enhanceRowWidth(pics, this.props.maxWidth, this.props.enhanceRatioWidth)
      Picture.enhanceRowHeight(pics, this.props.maxHeight, this.props.enhanceRatioHeight)

      var pictures = _.map(pics, function(pic) { return this.props.thumbComponent({picture: pic})}.bind(this))
      var lineHeight = pics[0] ? pics[0].thHeight : this.props.maxHeight

      if (!pictures.length)
        placeholder = <h3 className='placeholder'>Никто пока ничего не загружал</h3>

      return (
        <div className='pictures-line-component'>
          <ul style={{height: lineHeight}}>{pictures}</ul>
          {placeholder}
        </div>
      )
    }
  })

  return PicturesLine
})
