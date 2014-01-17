angular.module('app').directive('mGallery', ['$compile', function($compile) {

  return {
    restrict: 'AE',
    scope: {},
    replace: false,
    controller: Function.empty,
    compile: function(el, attrs) {
      var container = $('<div class="gallery-component hidden"></div>')

      el.append(container)

      return function(scope, el, attrs, ctrl) {
        ctrl.open = function(pics, pic) {
          container.removeClass('hidden')

          scope.fotorama = container.fotorama({
            height: '100%',
            width: '100%',
            nav: 'thumbs',
            fit: 'contain',
            click: true,
            swipe: true,
            arrows: true,
            keyboard: true,

            glimpse: '5%',
            margin: 5
          }).data('fotorama')

          scope.fotorama.load(_.map(pics, function(pic) {
            return {img: pic.image_url_big, thumb: pic.image_url_small}
          }))
          scope.fotorama.show({index: pics.indexOf(pic), time: 0})
        }

        $('body').on('keyup', function(e) {
          if (e.which == 27) {
            scope.fotorama.destroy()
            container.addClass('hidden')
          }
        })
      }
    }
  }

}])