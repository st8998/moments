angular.module('app').directive('mPicturesLine', ['PicturesSetReact', function(PicturesSetReact) {
  return {
    restrict: 'E',
    replace: true,

    scope: {
      pictures: '=',
      maxHeight: '=',
      maxWidth: '=',
      enhanceRatioWidth: '=',
      enhanceRatioHeight: '=',
      onRemoveCallback: '&onRemove',
      onReorderCallback: '&onReorder'
    },

    require: ['?^mScroll', '?^mGallery'],

    link: function(scope, elem, attrs, controllers) {
      var mScroll = controllers[0] || {}
      var mGallery = controllers[1]

      scope.onSelect = function(pic) {
        scope.$apply(function() {
          mGallery.open(scope.pictures, pic)
        })
      }

      if (attrs['onRemove']) {
        scope.onRemove = function(pic) {
          scope.$apply(function() {
            scope.onRemoveCallback({picture: pic})
          })
        }
      }
      if (attrs['onReorder']) {
        scope.onReorder = function(droppedOnIndex, targetIndex) {
          scope.$apply(function() {
            var pics = scope.pictures

            var removed = pics.splice(targetIndex, 1)[0]
            pics.splice(droppedOnIndex, 0, removed)

            scope.onReorderCallback()
          })
        }
      }

      React.renderComponent(PicturesSetReact(scope), elem[0], mScroll.refresh)

      scope.$watchCollection('pictures', function() {
        React.renderComponent(PicturesSetReact(scope), elem[0], mScroll.refresh)
      })
    }
  }
}])