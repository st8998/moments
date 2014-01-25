angular.module('app').factory('PicturesSetReact', ['Picture', function(Picture) {
  var h = React.addons.tagHelper

  var preventStop = false
  var Thumb = React.createClass({

    componentDidMount: function(node) {
      var pic = this.props.picture
      var comp = this

      if (this.props.onReorder) {
        this.draggable = $(node).draggable({
          containment: 'document',
          scope: this.props.dragScope,
          start: function() {
            $(this).data('pic', comp.props.picture)
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
            comp.props.onReorder(comp.props.picture.index, ui.draggable.data('pic').index)
            ui.draggable.removeData('pic')
          }
        })
      }
    },

    componentWillUnmount: function() {
      if (this.props.onReorder) {
        this.draggable.draggable('destroy')
        this.droppable.droppable('destroy')
      }
    },

    onRemove: function(e) {
      e.stopPropagation()
      this.props.onRemove()
    },

    render: function() {
      var pic = this.props.picture, removeButton

      if (this.props.onRemove) {
        removeButton = ['.remove-button', {onClick: this.onRemove}, ['span.glyphicon.glyphicon-remove']]
      }

      return React.addons.tagHelper(
        ['li', {style: pic.getContainerStyle(), onClick: this.props.onSelect},
          ['img', {src: pic.getUrl(), style: pic.getImageStyle()}],
          removeButton
        ]
      )
    }
  })

  return React.createClass({
    getDefaultProps: function() {
      return {
        pictures: [],
        maxHeight: 500,
        enhanceRatioWidth: 1,
        enhanceRatioHeight: 1
      }
    },

    render: function() {
      var placeholder, i
      var originals = this.props.pictures

      var pics = []
      for(i = 0; i < originals.length; i++) {
        var copy = originals[i].copyUI()
        copy.index = i
        pics.push(copy)
      }

      var dimensions = {height: 0, width: 0}
      if (pics.length) {
        dimensions = Picture.layoutPictures(pics, this.props)
      }

      var pictures = []
      for(i = 0; i < pics.length; i++) {
        pictures.push(Thumb({
          onSelect: this.props.onSelect && this.props.onSelect.bind(this, originals[i]),
          onRemove: this.props.onRemove && this.props.onRemove.bind(this, originals[i]),
          onReorder: this.props.onReorder && this.props.onReorder,
          picture: pics[i],
          key: pics[i].uid()}))
      }

      if (!pictures.length)
        placeholder = ['h3.placeholder', 'Никто пока ничего не загружал']

      return React.addons.tagHelper(
        ['div.pictures-line-component',
          ['ul', {style: {height: dimensions.height, width: dimensions.width}}, pictures],
          placeholder
        ]
      )
    }
  })
}])