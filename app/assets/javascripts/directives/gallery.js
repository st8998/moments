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

      scope.$watch(function() { return location.hash}, function(hash) {
        if (hash && (pathMatch = hash.match(pathRegexp))) {
          open(pathMatch[1], parseInt(pathMatch[2]))
        } else {
          close()
        }
      })

      function open(key, picId) {
        var pics = mGallery.set(key)

        if (pics) {
          elem.removeClass('hidden')
          $('body').css({overflow: 'hidden'})

          fotorama = elem.fotorama({
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

          fotorama.load(_.map(pics, function(pic) {
            return {
              img: pic.image_url_big,
              thumb: pic.image_url_small
            }
          }))

          if (picId) {
            var pic = _.find(pics, function(p) { return p.id == picId })

            fotorama.show({
              index: pics.indexOf(pic),
              time: 0
            })
          }
        }
      }

      function close() {
        if (fotorama) {
          fotorama.destroy()
          elem.addClass('hidden')
          $('body').css({overflow: 'auto'})
          fotorama = undefined
        }
      }

      $('body').on('keyup.fotorama', function(e) {
        if (e.which == 27) close()
      })

      elem.on('$destroy', function() {
        $('body').off('.fotorama')
      })
    }
  }

}])

