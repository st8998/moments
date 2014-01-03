angular.module('app').directive('mPicturesLine', ['PicturesLineReact', function(PicturesLineReact) {

  return {
    restrict: 'A',
    scope: {
      pictures: '=',
      maxHeight: '=',
      maxWidth: '=',
      enhanceRatioWidth: '=',
      enhanceRatioHeight: '='
    },
    link: function(scope, elem, attrs) {
      scope.$watch('pictures', function() {
        React.renderComponent(PicturesLineReact(scope), elem[0]);
      }, true)
    }
  }
}])