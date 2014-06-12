//= require widgets/moment_widget

angular.module('app').controller('MomentsCtrl', function($scope, $http, api, Moment) {

  this.api = api

  $scope.newMoment = new Moment()

  $http.get(api('moments')).success(function(data) {
    $scope.moments = _.map(data, function(attrs) {
      var m = new Moment(attrs)
      m.newMoment = new Moment({parent_id: m.id})
      if (!m.sub_moments) m.sub_moments = []
      return m
    })
  })

  $scope.createMoment = function() {
    if (!$scope.newMoment.date) $scope.newMoment.date = new Date()

    $http.post(api('moments'), {moment: $scope.newMoment.attributes()}).success(function(moment) {
      $scope.moments.unshift(new Moment(moment))
      $scope.newMoment = new Moment()
    })
  }

  $scope.createSubMoment = function(moment) {
    if (!moment.newMoment.date) moment.newMoment.date = new Date()

    $http.post(api('moments'), {moment: moment.newMoment.attributes()}).success(function(attrs) {
      moment.sub_moments.unshift(new Moment(attrs))
      moment.newMoment = new Moment({parent_id: moment.id})
    })
  }

  $scope.updateMoment = function(moment) {
    $http.put(api('moments', moment.id), {moment: moment.attributes()}).success(function(attrs) {
      moment.assignAttributes(attrs)
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