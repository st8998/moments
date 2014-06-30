angular.module('app').directive('momentWidget', function($http, Moment, api, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/template/widgets/moment_widget.html',
    scope: {
      moment: '=',
      onSubmit: '&',
      onRemove: '&'
    },
    link: function(scope, elem, attrs) {
      scope.api = api

      // pick gallery methods from root scope
      _.extend(scope, _.pick($rootScope, 'openGallery', 'closeGallery'))

      _.extend(scope, {
        open: function() {
          scope.moment._edit = true
        },
        close: function() {
          delete scope.moment._edit
          delete scope.moment._location
        },

        applyPlace: function(place) {
          scope.moment.place = place
          delete scope.moment._location
        },

        addPhoto: function(attrs) {
          var photos = scope.moment.photos, last = photos[photos.length-1]

          attrs.position = (last && last.position !== undefined) ? (last.position+1) : 0
          photos.push(attrs)

          if (!scope.moment.date) scope.moment.date = attrs.date
        },
        removePhoto: function(photo) {
          $http.delete(api('/photos/', photo.id))
          _.remove(scope.moment.photos, {id: photo.id})
        },
        movePhoto: function(from, to) {
          var photos = scope.moment.photos

          if (from < to)
            to -= 1

          var photo = photos.splice(from, 1)[0]
          photos.splice(to, 0, photo)

          _.each(photos, function(photo, index) {
            photo.position = index
          })
        },

        submit: function() {
          scope.close()
          scope.onSubmit()
        }
      })
    }
  }

})

