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
      onRemoveCallback: '&onRemove',
      onReorderCallback: '&onReorder'
    },

    require: ['?^mScroll', '?^mGallery'],

    link: function(scope, elem, attrs, controllers) {
      var mScroll = controllers[0] || {}
      var mGallery = controllers[1]

      if (attrs['onRemove']) {
        scope.onRemove = function(pic) {
          scope.$apply(function() {
            scope.onRemoveCallback({picture: pic})
          })
        }
      }
      if (attrs['onReorder']) {
        scope.onReorder = function(droppedOn, target) {
          scope.$apply(function() {
            var pics = scope.pictures
            scope.pictures = []
            _.each(pics, function(pic) {
              if (pic == droppedOn) {
                scope.pictures.push(target)
                scope.pictures.push(droppedOn)
              } else if (pic == target) {

              } else {
                scope.pictures.push(pic)
              }
            })
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