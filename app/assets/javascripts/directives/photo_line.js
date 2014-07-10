angular.module('app').directive('mTransclude', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs, controller, $transclude) {
      $transclude($scope, function(clone) {
        $element.empty()
        $element.append(clone)
      });
    }
  }
}).directive('mPhotoLine', function(Photo) {
  return {
    restrict: 'E',
    replace: true,

    transclude: true,

    scope: true,

    templateUrl: '/template/directives/photo_line.html',

    link: function(scope, elem, attrs, ctrl, $transclude) {
      var maxHeight = parseInt(attrs['maxHeight']) || 350,
        enhanceRatioHeight = parseFloat(attrs['enhanceRatioHeight']) || 0.9,
        enhanceRatioWidth = parseFloat(attrs['enhanceRatioWidth']) || 0.75,
        burstFirst = parseInt(attrs['burstFirst']) || 0

      // convert raw attrs to Photo objects
      scope.$parent.$watchCollection(attrs['photos'], function(photos) {
        scope.photos = photos

        if (scope.photos.length) {
          console.log(burstFirst)

          scope.dimensions = Photo.layoutPhotos2(scope.photos, {
            maxWidth: elem.width(),
            maxHeight: maxHeight,
            enhanceRatioWidth: enhanceRatioWidth,
            enhanceRatioHeight: enhanceRatioHeight,
            burstFirst: burstFirst
          })
        }
      })
    }
  }
})