//= require widgets/moment_widget

angular.module('app').controller('MomentsCtrl', function($scope, $http, api, Moment, $moment) {

  this.api = api

  $scope.newMoment = new Moment()

  $http.get(api('photos')).success(function(data) {
    $scope.photos = data
  })

  $http.get(api('moments')).success(function(data) {
    $scope.moments = Moment.fromJson(data)
  })

  $scope.createMoment = function() {
    if (!$scope.newMoment.date) $scope.newMoment.date = $moment().format('DD/MM/YYYY HH:mm')

    $http.post(api('moments'), {moment: $scope.newMoment.attributes()}).success(function(data) {
      var created = Moment.fromJson(data)

      $scope.moments.unshift(created)
      $scope.newMoment = new Moment()
    })
  }

  $scope.createSubMoment = function(moment) {
    if (!moment.newMoment.date) moment.newMoment.date = $moment().format('DD/MM/YYYY HH:mm')

    $http.post(api('moments'), {moment: moment.newMoment.attributes()}).success(function(attrs) {
      moment.sub_moments.push(new Moment(_.merge(attrs, {parent: moment})))
      moment.newMoment = new Moment({parent_id: moment.id})
    })
  }

  $scope.updateMoment = function(moment) {
    $http.put(api('moments', moment.id), {moment: moment.attributes()}).success(function(attrs) {
      moment.assignAttributes(attrs)

      if (attrs.sub_moments) {
        moment.sub_moments = _.map(attrs.sub_moments, function(attrs) {return new Moment(attrs)})
      } else {
        moment.sub_moments = []
      }
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