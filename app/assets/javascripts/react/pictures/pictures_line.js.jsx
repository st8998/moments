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

      var dimensions = Picture.layoutPictures(pics, this.props)

      var pictures = _.map(pics, function(pic) { return this.state.thumbComponent({picture: pic, key: pic.uid()})}.bind(this))

      if (!pictures.length)
        placeholder = <h3 className='placeholder'>Никто пока ничего не загружал</h3>

      return (
        <div className='pictures-line-component'>
          <ul style={{height: dimensions.height, width: dimensions.width}}>{pictures}</ul>
          {placeholder}
        </div>
      )
    }
  })
}])