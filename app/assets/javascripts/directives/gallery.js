angular.module('app').directive('mGallery', function($rootScope, PhotoSet) {
  return {
    restrict: 'E',
    templateUrl: '/template/directives/gallery.html',
    replace: true,
    scope: true,
    link: function(scope, elem, attrs) {
      var fotorama
        , $body = $('body')
        , closed = true
        , fotoramaContainer = elem.find('.fotorama-container')

      function open(photos, photo) {
        closed = false
        elem.removeClass('hidden')
        $body.addClass('gallery-mode')

        fotorama = fotoramaContainer.fotorama({
          maxheight: '1024px',
          height: '100%',
          width: '100%',
          nav: false,
          fit: 'scaledown',
          allowfullscreen: 'native',
          click: true,
          swipe: true,
          arrows: true,
          keyboard: true,
          startindex: photo ? _.findIndex(photos, {id: photo.id}) : 0,
          data: _.map(photos, function(photo) {
            return {
              img: photo.image_url_1024,
              full: photo.image_url_original,
              photo: photo
            }
          })
        }).data('fotorama')

        scope.photo = photo ? photo : photos[0]

        fotoramaContainer.on('fotorama:show', function(e, fotorama) {
          if (scope.photo != fotorama.activeFrame.photo) {
            scope.$apply(function() {
              scope.photo = fotorama.activeFrame.photo
            })
          }
        })

        var cancelExit = false
        fotoramaContainer.on('fotorama:fullscreenexit', function() {
          cancelExit = true
        })

        $body.on('keyup.fotorama', function(e) {
          if (e.which == 27 && !cancelExit) scope.closeGallery()
          cancelExit = false
        })
      }

      $rootScope.openGallery = function(photos, photo) {
        if (_.isString(photos)) {
          PhotoSet.get(photos).then(function(photos) {
            open(photos, photo)
          })
        } else {
          open(photos, photo)
        }
      }

      $rootScope.closeGallery = function() {
        if (!closed) {
          elem.addClass('hidden')
          $body.removeClass('gallery-mode')

          fotorama.destroy()
          fotoramaContainer.removeData('fotorama')
          fotoramaContainer.off('fotorama:show')
          fotoramaContainer.off('fotorama:fullscreenexit')

          $body.off('.fotorama')
          closed = true
          fotorama = undefined
        }
      }

      elem.on('$destroy', function() {
        if (fotorama) fotorama.destroy()
        fotoramaContainer.off('fotorama:showend')
      })
    }
  }
})

