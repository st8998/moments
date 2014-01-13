/** @jsx React.DOM */

angular.module('app').factory('PicturesLineReact', ['ThumbReact', 'Picture', function(Thumb, Picture) {
  var removableThumbFactory = function(onRemove) {
    return React.createClass({
      render: function() {
        var pic = this.props.picture

        return this.transferPropsTo(
          <Thumb>
            <div className='controls'>
              <span onClick={onRemove.bind(this, pic)} className='glyphicon glyphicon-trash' />
            </div>
          </Thumb>
        )
      }
    })
  }

  return React.createClass({
    getDefaultProps: function() {
      return {
        pictures: [],
        maxHeight: 500,
        enhanceRatioWidth: 1,
        enhanceRatioHeight: 1
      }
    },

    getInitialState: function() {
      var thumbComponent
      if (this.props.thumbComponent) {
        thumbComponent = this.props.thumbComponent
      } else if (this.props.onRemove) {
        thumbComponent = removableThumbFactory(this.props.onRemove)
      } else {
        thumbComponent = Thumb
      }
      return {thumbComponent: thumbComponent}
    },

    render: function() {
      var pics = this.props.pictures, placeholder

      Picture.fitInRow(pics, this.props.maxWidth, this.props.maxHeight+2)

      if (this.props.enhanceRatioWidth)
        Picture.enhanceRowWidth(pics, this.props.maxWidth, this.props.enhanceRatioWidth)

      if (this.props.enhanceRatioHeight)
        Picture.enhanceRowHeight(pics, this.props.maxHeight, this.props.enhanceRatioHeight)

      Picture.updateOffsets(pics)

      var lineHeight, lineWidth
      if (pics.length) {
        lineHeight = pics[0] ? pics[0].thHeight : this.props.maxHeight

        var lastThumb = pics[pics.length-1].getContainerStyle()
        lineWidth = lastThumb ? lastThumb.left+lastThumb.width : this.props.maxWidth
      } else {
        lineHeight = this.props.maxHeight || 0
        lineWidth = this.props.maxWidth || 0
      }

      var pictures = _.map(pics, function(pic) { return this.state.thumbComponent({picture: pic, key: pic.uid()})}.bind(this))

      if (!pictures.length)
        placeholder = <h3 className='placeholder'>Никто пока ничего не загружал</h3>

      return (
        <div className='pictures-line-component'>
          <ul style={{height: lineHeight, width: lineWidth}}>{pictures}</ul>
          {placeholder}
        </div>
      )
    }
  })
}])