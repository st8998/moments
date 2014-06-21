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
          scope.moment.photos.push(attrs)
          if (!scope.moment.date) scope.moment.date = attrs.date
        },
        removePhoto: function(photo) {
          $http.delete(api('/photos/', photo.id))
          _.remove(scope.moment.photos, {id: photo.id})
        },

        submit: function() {
          scope.close()
          scope.onSubmit()
        }
      })

//      $scope.createMoment = function() {
//        if (!$scope.newMoment.date) $scope.newMoment.date = new Date()
//
//        $http.post(api('moments'), {moment: $scope.newMoment.attributes()}).success(function(moment) {
//          $scope.moments.unshift(new Moment(moment))
//          $scope.closeMoment($scope.newMoment)
//          $scope.newMoment = new Moment()
//        })
//      }
//
//      $scope.updateMoment = function(moment) {
//        $http.put(api('moments', moment.id), {moment: moment.attributes()}).success(function(attrs) {
//          $scope.closeMoment(moment)
//          moment.assignAttributes(attrs)
//        })
//      }
//
//      $scope.removeMoment = function(moment) {
//        _.remove($scope.moments, {id: moment.id})
//        $http.delete(api('moments', moment.id))
//      }


    }
  }

})

