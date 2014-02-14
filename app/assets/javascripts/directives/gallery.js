angular.module('app').directive('mGallery', ['$location', 'routes', 'Pictures', function($location, routes, Pictures) {

  routes.register('gallery', _.curry(function(key, pic) {
    return '/p/'+key+'/'+pic
  }))

  var URL_PATTERN = /\/p\/(\w+)\/(\w+)/

  return {
    restrict: 'E',
    scope: {},
    replace: true,
    template: '<div class="gallery-component hidden"></div>',
    link: function(scope, elem, attrs, mGallery) {
      var fotorama
        , pathMatch
        , $body = $('body')
        , closed = true

      scope.$watch(function() { return location.hash}, function(hash) {
        var picsPromise

        if (hash && (pathMatch = hash.match(URL_PATTERN))) {
          if (closed && (picsPromise = Pictures.pictures(pathMatch[1]))) {
            picsPromise.then(function(pics) {
              open(pics, pathMatch[2], pathMatch[1])
            })
          }
        } else {
          close()
        }
      })

      function open(pics, picId, key) {
        closed = false
        elem.removeClass('hidden')
        $body.addClass('gallery-mode')

        var url = routes.gallery(key)

        fotorama = elem.fotorama({
          height: '100%',
          width: '100%',
          nav: false,
          fit: 'contain',
          click: true,
          swipe: true,
          arrows: true,
          keyboard: true,
          hash: true,
          margin: 5,
          startindex: picId ? url(picId) : 0,
          data: _.map(pics, function(pic) {
            return {
              img: pic.image_url_big,
              thumb: pic.image_url_small,
              id: url(pic.id)
            }
          })
        }).data('fotorama')

        $body.on('keyup.fotorama', function(e) {
          if (e.which == 27) location.hash = '/'
        })
      }

      function close() {
        if (!closed) {
          fotorama.destroy()
          elem.addClass('hidden')
          elem.removeData('fotorama')
          $body.removeClass('gallery-mode')
          $body.off('.fotorama')
          closed = true
          fotorama = undefined
        }
      }

      elem.on('$destroy', function() {
        if (fotorama) fotorama.destroy()
      })
    }
  }

}])

