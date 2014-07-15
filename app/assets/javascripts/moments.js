//= require widgets/moment_widget

angular.module('app').controller('MomentsCtrl', function($scope, $http, api, Moment, Place, $moment) {

  this.api = api

  $scope.place = new Place({name: 'SOME'})

  $scope.newMoment = new Moment()

  $scope.moments = []
  $scope.hasMoreMoments = true
  $scope.loadMoreMoments = function() {
    var last, params

    $scope.loadingMoments = true
    if (last = $scope.moments[$scope.moments.length-1]) {
      params = {from_date: last.date, from_id: last.id}
    }

    $http.get(api('moments'), {params: params}).success(function(data) {
      $scope.loadingMoments = false
      if (data.length) {
        $scope.moments.push.apply($scope.moments, data)

        setTimeout(function() {
          $(document).trigger('scroll')
        }, 100)
      } else {
        $scope.hasMoreMoments = false
      }
    })
  }
  $scope.loadMoreMoments()

  $scope.createMoment = function() {
    if (!$scope.newMoment.date) $scope.newMoment.date = $moment().format('DD/MM/YYYY HH:mm')

    $http.post(api('moments'), $scope.newMoment, {tracker: $scope[$scope.newMoment.uid]}).success(function(moment) {
      $scope.moments.unshift(moment)
      $scope.newMoment = new Moment()
    })
  }

  $scope.createSubMoment = function(moment) {
    if (!moment.newMoment.date) moment.newMoment.date = $moment().format('DD/MM/YYYY HH:mm')

    $http.post(api('moments'), moment.newMoment, {tracker: $scope[moment.newMoment.uid]}).success(function(attrs) {
      moment.sub_moments.push(new Moment(_.merge(attrs, {parent: moment})))
      moment.newMoment = new Moment({parent_id: moment.id})
    })
  }

  $scope.updateMoment = function(moment) {
    $http.put(api('moments', moment.id), moment, {tracker: $scope[moment.uid]}).success(function(attrs) {
      moment.assignAttributes(attrs)
      moment._edit = false
    })
  }

  $scope.removeMoment = function(moment) {
    _.remove($scope.moments, {id: moment.id})
    $http.delete(api('moments', moment.id))
  }

  $scope.removeSubMoment = function(moment, sub_moment) {
    _.remove(moment.sub_moments, {id: sub_moment.id})
    $http.delete(api('moments', sub_moment.id))
  }
})
