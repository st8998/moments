angular.module('app').directive('mTransclude', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs, controller, $transclude) {
      $transclude($scope, function(clone) {
        $element.empty();
        $element.append(clone);
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
      var maxHeight = 350, enhanceRation = 0.7

      attrs.$observe('maxHeight', function(height) {
        maxHeight = parseInt(height)
      })

      attrs.$observe('enhanceRation', function(ration) {
        enhanceRation = parseFloat(ration)
      })

      $transclude(scope, function(clone) {
        elem.append(clone)
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

        if (scope.photos.length) {
          scope.dimensions = Photo.layoutPhotos(scope.photos, {
            maxWidth: elem.width(),
            maxHeight: maxHeight,
            enhanceRatioWidth: enhanceRation,
            enhanceRatioHeight: enhanceRation
          })
        }
      })
    }
  }
})