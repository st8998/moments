angular.module('app').directive('mCloseable', function() {
  return {
    restrict: 'A',
    scope: {
      onClose: '&mCloseable'
    },
    link: function(scope, elem, attrs) {
      var cancelClose

      function close() {
        if (!cancelClose) scope.$apply(scope.onClose)
        cancelClose = false
      }

      setTimeout(function() {
        $(document).on('click.mCloseable', close)

        elem.on('click.mCloseable', function(e) {
          cancelClose = true
        })
      }, 0)

      elem.on('change.mCloseable', function() {
        $(document).off('click', close)
        elem.off('.mCloseable')
      })

      elem.on('$destroy', function() {
        $(document).off('click', close)
      })
    }
  }
})