angular.module('app').directive('mPicturesUploader', ['PicturesUploaderReact', function(PicturesUploaderReact) {

  return {
    restrict: 'A',
    scope: {
      pictures: '='
    },
    link: function(scope, elem, attrs) {
      scope.onPicturesChange = function(pics) {
        scope.$apply(function() {
          scope.pictures = pics
        })
      }

      scope.maxHeight = 500
      scope.maxWidth = 900

      scope.$watch('pictures', function() {
        React.renderComponent(PicturesUploaderReact(scope), elem[0]);
      }, true)
    }
  }

}])