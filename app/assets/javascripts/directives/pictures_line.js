angular.module('app').directive('mPicturesLine', ['PicturesLineReact', function(PicturesLineReact) {
  return {
    restrict: 'E',
    replace: true,

    scope: {
      pictures: '=',
      maxHeight: '=',
      maxWidth: '=',
      enhanceRatioWidth: '=',
      enhanceRatioHeight: '=',
      onRemoveCallback: '&onRemove'
    },

    require: '?mScroll',

    link: function(scope, elem, attrs, mScroll) {
      mScroll = mScroll || {}

      if (attrs['onRemove']) {
        scope.onRemove = function(pic) {
          scope.$apply(function() {
            scope.onRemoveCallback({picture: pic})
          })
        }
      }

      React.renderComponent(PicturesLineReact(scope), elem[0], mScroll.refresh)

      scope.$watchCollection('pictures', function() {
        React.renderComponent(PicturesLineReact(scope), elem[0], mScroll.refresh)
      })
    }
  }
}])