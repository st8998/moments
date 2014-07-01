angular.module('app').directive('mReorder', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, root, attrs) {
      var onReorder = attrs['onReorder'] ? $parse(attrs['onReorder']) : null

      var active, items

      root.on('dragstart', '[draggable=true]', function(e) {
        active = this
        items = root.find('[draggable=true]')

        items.each(function() {
          var el = $(this)
          el.data('mReorderDims', {left: parseInt(el.css('left')), width: parseInt(el.css('width'))})
        })

        active.style.opacity = '0'
        e.originalEvent.dataTransfer.effectAllowed = 'move'
        e.originalEvent.dataTransfer.setData('text/html', this.innerHTML)
      })

      // drag enter/leave styling
      root.on('dragenter', '[draggable=true]', function() {
        var el = $(this), dims = el.data('mReorderDims')
        el.css({left: dims.left + 5, width: dims.width - 5})
      }).on('dragleave drop', '[draggable=true]', function() {
        var el = $(this)
        el.css(el.data('mReorderDims'))
      })

      root.on('dragend', '[draggable=true]', function() {
        active.style.opacity = '1'
      })

      root.on('dragover', '[draggable=true]', function(e) {
        e.preventDefault()
        e.originalEvent.dataTransfer.dropEffect = 'move'
      })

      root.on('drop', '[draggable=true]', function(e) {
        e.stopPropagation()

        var from = items.index(active),
          to = items.index(this)

        if (onReorder) {
          root.trigger('change')
          onReorder(scope, {from: from, to: to})
        }
      })
    }
  }
})