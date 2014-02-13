angular.module('app').directive('mGallerySet', [function() {
  return {
    restrict: 'E',
    require: '^mGallery',
    link: function(scope, elem, attrs, mGallery) {
      scope.$watch(attrs['set'], function(value) {
        if (value) mGallery.register(attrs['key'], value)
      })
    }
  }
}])

angular.module('app').directive('mGallery', ['$location', function($location) {

  function Controller() {
    var sets = {}

    this.set = function(key) {
      return sets[key]
    }
    this.register = function(key, pics) {
      sets[key] = pics
    }
    this.deregister = function(key, pics) {
      delete sets[key]
    }
  }

  function fromPicture(pic) {
    return {
      img: pic.image_url_big,
      thumb: pic.image_url_small
    }
  }

  return {
    restrict: 'E',
    scope: {},
    replace: true,
    transclude: true,
    controller: Controller,
    template: '<div class="gallery-component hidden" ng-transclude></div>',
    link: function(scope, elem, attrs, mGallery) {
      var fotorama
        , pathRegexp = /\/photos\/(\w+)\/(\w+)/
        , pathMatch
        , $body = $('body')

      scope.$watch(function() { return location.hash}, function(hash) {
        var pics, pic, id

        if (hash && (pathMatch = hash.match(pathRegexp))) {
          open(pathMatch[1], parseInt(pathMatch[2]))

          if (pics = mGallery.set(pathMatch[1])) {
            if (id = parseInt(pathMatch[2])) {
              pic = _.find(pics, function(p) { return p.id == id })
            }

            open(pics, pic)
          }
        } else {
          close()
        }
      })

      function open(pics, pic) {
        elem.removeClass('hidden')
        $body.addClass('gallery-mode')

        fotorama = elem.fotorama({
          height: '100%',
          width: '100%',
          nav: false,
          fit: 'contain',
          click: true,
          swipe: true,
          arrows: true,
          keyboard: true,

          margin: 5
        }).data('fotorama')

        fotorama.load(_.map(pics, fromPicture))

        if (pic) fotorama.show({index: pics.indexOf(pic), time: 0})

        $body.on('keyup.fotorama', function(e) {
          if (e.which == 27) close()
        })
      }

      function close() {
        elem.addClass('hidden')
        $body.removeClass('gallery-mode')
        $body.off('.fotorama')
        location.hash = ''
      }

      elem.on('$destroy', function() {
        if (fotorama) fotorama.destroy()
      })
    }
  }

}])

