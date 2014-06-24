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
      var maxHeight = 350, enhanceRatioHeight = 0.9, enhanceRatioWidth = 0.6

      attrs.$observe('maxHeight', function(height) {
        maxHeight = parseInt(height) || 350
      })

      attrs.$observe('enhanceRatioHeight', function(ratio) {
        enhanceRatioHeight = parseFloat(ratio) || 0.9
      })

      attrs.$observe('enhanceRatioWidth', function(ratio) {
        enhanceRatioWidth = parseFloat(ratio) || 0.6
      })

      // convert raw attrs to Photo objects
      scope.$parent.$watchCollection(attrs['photos'], function(rawPhotos) {
        scope.photos = _.map(rawPhotos, function(attrs) {
          if (attrs.constructor != Photo) {
            return new Photo(attrs)
          } else {
            return attrs
          }
        })

        console.log({
                    maxWidth: elem.width(),
                    maxHeight: maxHeight,
                    enhanceRatioWidth: enhanceRatioWidth,
                    enhanceRatioHeight: enhanceRatioHeight
                  })

        if (scope.photos.length) {
          scope.dimensions = Photo.layoutPhotos(scope.photos, {
            maxWidth: elem.width(),
            maxHeight: maxHeight,
            enhanceRatioWidth: enhanceRatioWidth,
            enhanceRatioHeight: enhanceRatioHeight
          })
        }
      })
    }
  }
})