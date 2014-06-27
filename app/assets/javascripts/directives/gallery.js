angular.module('app').filter('shootingSettings', function() {
  return function(attrs) {
    if (!attrs) return

    var out = []

    if (attrs.exposure_time) {
      var sec = attrs.exposure_time + ' sec'
      if (attrs.aperture_value) {
        sec += ' at f / '+ attrs.aperture_value
      }
      out.push(sec)
    } else if (attrs.aperture_value) {
      out.push('f / '+ attrs.aperture_value)
    }

    if (attrs.iso)
      out.push('ISO ' + attrs.iso)
    if (attrs.focal_length)
      out.push(attrs.focal_length+'mm')

    return out.join(', ')
  }
}).filter('placeToHtml', function(Place, $sce) {
  return function(attrs) {
    var place = attrs.constructor === Place ? attrs : new Place(attrs)
    var out = ''

    if (place.name)
      out += '<span class="name">'+place.name+'</span>'
    out += '<span class="primary-line">'+place.primaryLine()+'</span>'
    out += '<span class="secondary-line">'+place.secondaryLine()+'</span>'

    return $sce.trustAsHtml(out)
  }
}).directive('mGallery', function($http, api, $rootScope, PhotoSet, routes) {
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

        var navigation = photos.length < 30 ? 'thumbs' : false

        fotorama = fotoramaContainer.fotorama({
          maxheight: '1024px',
          height: '100%',
          width: '100%',
          nav: navigation,
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
              thumb: photo.image_url_64,
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

        if (navigation) {
          fotoramaContainer.on('fotorama:fullscreenenter fotorama:fullscreenexit', function (e, fotorama) {
            if (e.type === 'fotorama:fullscreenenter') {
              fotorama.setOptions({nav: false});
            } else {
              fotorama.setOptions({nav: navigation});
            }
          })
        }

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

      scope.updatePhoto = function() {
        delete scope.photo._edit
        $http.put(api('photos', scope.photo.id), {photo: _.pick(scope.photo, 'description')})
      }

      scope.position = function() {
        return (fotorama.activeIndex+1) + ' / ' + fotorama.size
      }

      elem.on('$destroy', function() {
        if (fotorama) fotorama.destroy()
        fotoramaContainer.off('fotorama:showend')
      })
    }
  }
})

