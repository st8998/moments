angular.module('app').directive('mSrc', function() {
  return {
    restrict: 'A',
    priority: 99,
    link: function(scope, elem, attrs) {
      elem.addClass('lazy')

      attrs.$observe('mSrc', function(value) {
        attrs.$set('data-original', value)
      })

      attrs.$set('src', '/assets/image_placeholder.svg')
    }
  }
})