angular.module('app').directive('momentWidget', function($http, Moment, api) {
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
      var moment = scope.moment

      scope.api = api

      _.extend(scope, {
        open: function() {
          moment._edit = true
        },
        close: function() {
          moment._edit = false
        },

        addPhoto: function(attrs) {
          moment.photos.push(attrs)
          if (!moment.date) moment.date = attrs.date
        },
        removePhoto: function(photo) {
          $http.delete(api('/photos/', photo.id))
          _.remove(moment.photos, {id: photo.id})
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

