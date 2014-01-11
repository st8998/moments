angular.module('app').directive('mScroll', function() {
  return {
    restrict: 'A',
    priority: 1000,
    link: function(scope, elem, attrs) {
      var container = attrs['mScroll'] ? elem.find(attrs['mScroll']) : elem
      var iScroll = new IScroll(container.get(0), {
        disableMouse: false,
        scrollX: true,
        scrollY: false,
        mouseWheel: true,
        bounce: false,
        momentum: false
      })

      scope.$watch(function() {
        setTimeout(function() {
          iScroll.refresh()
        }, 100)
      })

      elem.on('$destroy', function() {
        iScroll.destroy()
        console.log('DESTROY SCROLL')
      })
    }
  }
})