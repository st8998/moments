angular.module('app').directive('mActivateOnScroll', function() {
  return {
    restrict: 'A',

    link: function(scope, elem, attrs) {
      var $document = $(document), $window = $(window)

      function scrollListener() {
        if ($document.scrollTop()+$window.outerHeight()*2 > elem.offset().top) {
          elem.trigger('click')
        }
      }

      $document.on('scroll', scrollListener)

      elem.on('$destroy', function() {
        $document.off('scroll', scrollListener)
      })
    }
  }
})