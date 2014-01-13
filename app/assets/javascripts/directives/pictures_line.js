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

    require: ['?^mScroll', '?^mGallery'],

    link: function(scope, elem, attrs, controllers) {
      console.log(controllers)

      var mScroll = controllers[0] || {}
      var mGallery = controllers[1]
      if (mGallery)
        mGallery.test()

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