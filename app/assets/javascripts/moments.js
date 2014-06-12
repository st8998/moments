//= require models/picture

angular.module('app').controller('MomentsCtrl', function($scope, $http, api, Moment) {

  this.api = api

  $scope.newMoment = new Moment()

  $http.get(api('moments')).success(function(data) {
    $scope.moments = _.map(data, function(attrs) {
      return new Moment(attrs)
    })
  })

  $scope.openMoment = function(moment) {
    moment._edit = true
  }

  $scope.closeMoment = function(moment) {
    moment._edit = false
  }

  $scope.createMoment = function() {
    if (!$scope.newMoment.date) $scope.newMoment.date = new Date()

    $http.post(api('moments'), {moment: $scope.newMoment.attributes()}).success(function(moment) {
      $scope.moments.unshift(new Moment(moment))
      $scope.closeMoment($scope.newMoment)
      $scope.newMoment = new Moment()
    })
  }

  $scope.updateMoment = function(moment) {
    $http.put(api('moments', moment.id), {moment: moment.attributes()}).success(function(attrs) {
      $scope.closeMoment(moment)
      moment.assignAttributes(attrs)
    })
  }

  $scope.removeMoment = function(moment) {
    _.remove($scope.moments, {id: moment.id})
    $http.delete(api('moments', moment.id))
  }

  $scope.addPhoto = function(moment, attrs) {
    moment.photos.push(attrs)
    if (!moment.date) moment.date = attrs.date
  }

  $scope.removePhoto = function(moment, photo) {
    $http.delete(api('/photos/', photo.id))
    _.remove(moment.photos, {id: photo.id})
  }
})