angular.module('app').directive('mPicturesUploader', ['PicturesUploaderReact', function(PicturesUploaderReact) {

  return {
    restrict: 'E',
    scope: {
      pictures: '=',
      maxHeight: '=',
      maxWidth: '=',
      enhanceRatioWidth: '=',
      enhanceRatioHeight: '='
    },
    link: function(scope, elem, attrs) {
      scope.onPicturesChange = function(pics) {
        scope.$apply(function() {
          scope.pictures = pics
        })
      }

      scope.$watch('pictures', function() {
        React.renderComponent(PicturesUploaderReact(scope), elem[0]);
      }, true)
    }
  }

}])