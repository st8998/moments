angular.module('app').directive('mLoading', function($rootScope, promiseTracker) {
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
      var trackerName = attrs.mLoading
        , tracker = promiseTracker()

      $rootScope[trackerName] = tracker

      $rootScope.$watch(tracker.active, function(isActive) {
        if (isActive) {
          el.append('<div class="disabler"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>')
          el.addClass('disabler-container')
        } else {
          el.removeClass('disabler-container')
          el.find('.disabler').remove()
        }
      })

      el.on('$destroy', function() {
        delete scope[trackerName]
      })
    }
  }
})