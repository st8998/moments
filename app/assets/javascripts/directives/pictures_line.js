angular.module('app').directive('mPicturesLine', ['PicturesLineReact', function(PicturesLineReact) {

  return {
    restrict: 'E',
    scope: {
      pictures: '=',
      maxHeight: '=',
      maxWidth: '=',
      enhanceRatioWidth: '=',
      enhanceRatioHeight: '='
    },
    replace: true,
    link: function(scope, elem, attrs) {
      scope.$watch('pictures', function() {
        React.renderComponent(PicturesLineReact(scope), elem[0]);
      }, true)
    }
  }
}])