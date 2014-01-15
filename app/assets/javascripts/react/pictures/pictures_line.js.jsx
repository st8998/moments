/** @jsx React.DOM */

angular.module('app').factory('PicturesLineReact', ['ThumbReact', 'Picture', 'sequence', function(Thumb, Picture, seq) {
  var preventStop = false

  var ReorderMixin = {
    componentDidMount: function(node) {
      var pic = this.props.picture
      var comp = this

      this.draggable = $(node).draggable({
        containment: 'document',
        scope: this.props.dragScope,
        start: function() {
          var props = pic.getContainerStyle()
          props.width = props.width / 1.5
          props.height = props.height / 1.5
          $(this).css(props).
            data('originalPic', comp.props.originalPicture).
            data('pic', comp.props.picture)
        },
        stop: function() {
          if (preventStop) {
            preventStop = false
          } else {
            $(this).css($(this).data('pic').getContainerStyle())
          }
        }
      })

      this.droppable = $(node).droppable({
        hoverClass: 'image-over',
        scope: this.props.dragScope,
        accept: 'li.ui-draggable',
        drop: function(e, ui) {
          preventStop = true
          ui.draggable.css(ui.draggable.data('pic').getContainerStyle())
          comp.props.onReorder(comp.props.originalPicture, ui.draggable.data('originalPic'))
        }
      })
    },
    componentWillUnmount: function() {
      this.draggable.draggable('destroy')
      this.droppable.droppable('destroy')
    }
  }

  var thumbFactory = function(props) {
    var mixins = []

    if (props.onReorder) {
      mixins.push(ReorderMixin)
    }

    return React.createClass({
      mixins: mixins,
      getDefaultProps: function() {
        return {onReorder: props.onReorder}
      },

      render: function() {
        var pic = this.props.picture

        var controls = []
        if (props.onRemove) {
          controls.push(<span onClick={props.onRemove.bind(this, this.props.originalPicture)} className='glyphicon glyphicon-trash' />)
        }

        if (controls.length) {
          controls = (
            <div className='controls'>
              {controls}
            </div>
          )
        }

        return this.transferPropsTo(
          <Thumb>
            {controls}
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
      } else {
        thumbComponent = thumbFactory(_.extend({dragScope: seq('draggable-scope-')}, this.props))
      }

      return {thumbComponent: thumbComponent}
    },

    render: function() {
      var oPics = this.props.pictures, placeholder
      var pics = _.map(oPics, function(pic) {return pic.copyUI()})

      var dimensions = {height: 0, width: 0}
      if (pics.length) {
        dimensions = Picture.layoutPictures(pics, this.props)
      }

      var pictures = []
      for(var i = 0; i < pics.length; i++) {
        pictures.push(this.state.thumbComponent({originalPicture: oPics[i], picture: pics[i], key: pics[i].uid()}))
      }

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