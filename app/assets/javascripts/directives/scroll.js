angular.module('app').directive('mScroll', function() {
  return {
    restrict: 'A',
    priority: 1000,

    controller: Function.empty,

    link: function(scope, elem, attrs, controller) {
      var container = attrs['mScroll'] ? elem.find(attrs['mScroll']) : elem
      var iScroll = new IScroll(container.get(0), {
        disableMouse: false,
        scrollX: true,
        scrollY: false,
        mouseWheel: true,
        bounce: true,
        momentum: true,
        deceleration: 0.005,
        keyBindings: true,
        click: true
      })

      controller.refresh = IScroll.prototype.refresh.bind(iScroll)

      elem.on('$destroy', function() {
        iScroll.destroy()
      })
    }
  }
})