angular.module('app').directive('mPicturesLine', ['PicturesLineReact', function(PicturesLineReact) {
  return {
    restrict: 'E',
    scope: {
      pictures: '=',
      maxHeight: '=',
      maxWidth: '=',
      enhanceRatioWidth: '=',
      enhanceRatioHeight: '=',
      onRemoveCallback: '&onRemove'
    },
    replace: true,
    link: function(scope, elem, attrs) {
      if (attrs['onRemove']) {
        scope.onRemove = function(pic) {
          scope.$apply(function() {
            scope.onRemoveCallback({picture: pic})
          })
        }
      }

      React.renderComponent(PicturesLineReact(scope), elem[0])

      scope.$watchCollection('pictures', function() {
        React.renderComponent(PicturesLineReact(scope), elem[0])
      })
    }
  }
}])