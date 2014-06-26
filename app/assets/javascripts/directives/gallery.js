angular.module('app').directive('mGallery', function($rootScope, PhotoSet, routes) {
  return {
    restrict: 'E',
    templateUrl: '/template/directives/gallery.html',
    replace: true,
    scope: true,
    link: function(scope, elem, attrs) {
      routes.register('gallery', function(key, photo_id) {
        return '/photos/' + key + '/' + photo_id
      })

      var fotorama
        , $body = $('body')
        , closed = true
        , fotoramaContainer = elem.find('.fotorama-container')

      function open(photos, startPhotoId, key) {
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
          hash: !!key,
          startindex: startPhotoId ? _.findIndex(photos, {id: startPhotoId}) : 0,
          data: _.map(photos, function(photo) {
            return {
              img: photo.image_url_1024,
              full: photo.image_url_original,
              photo: photo,
              id: routes.gallery(key, photo.id)
            }
          })
        }).data('fotorama')

        scope.photo = fotorama.activeFrame.photo

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

      $rootScope.openGallery = function(keyOrPhotos, photo) {
        var startPhotoId = _.isNumber(photo) ? photo : photo.id

        if (_.isString(keyOrPhotos)) {
          PhotoSet.get(keyOrPhotos).then(function(photos) {
            open(photos, startPhotoId, keyOrPhotos)
            window.location.hash = routes.gallery(keyOrPhotos, startPhotoId)
          })
        } else {
          open(keyOrPhotos, startPhotoId)
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

          window.location.hash = '/'
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

