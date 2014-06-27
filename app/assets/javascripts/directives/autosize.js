angular.module('app').directive('mAutosize', function() {
  return {
    restrict: 'A',

    require: '?ngModel',

    link: function(scope, elem, attrs, ngModel) {
      elem.autosize()

      scope.$watch(function() {
        return ngModel.$modelValue
      }, function(a, b) {
        elem.trigger('autosize.resize')

        if (a === b) {
          document.body.offsetWidth // force a reflow before the class gets applied
          elem.addClass('autosize-transition')
        }
      })
    }
  }
})