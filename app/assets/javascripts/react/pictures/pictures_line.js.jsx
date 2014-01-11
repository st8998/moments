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
        maxWidth: 800,
        maxHeight: 500,
        enhanceRatioWidth: 0.6,
        enhanceRatioHeight: 0.9
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
      Picture.enhanceRowWidth(pics, this.props.maxWidth, this.props.enhanceRatioWidth)
      Picture.enhanceRowHeight(pics, this.props.maxHeight, this.props.enhanceRatioHeight)

      var pictures = _.map(pics, function(pic) { return this.state.thumbComponent({picture: pic, key: pic.uid()})}.bind(this))
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
}])