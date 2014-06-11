//= require models/picture

angular.module('app').controller('MomentsCtrl', function($scope, $http, api, Moment) {

  this.api = api

//  $scope.newMoment = new Moment()

  $http.get(api('moments')).success(function(data) {
    $scope.moments = data
  })

  $scope.openNewMoment = function() {
    $scope.newMoment = new Moment()
  }

  $scope.closeNewMoment = function() {
    console.log('CLOSE NEW MOMENT')
    $scope.newMoment = undefined
  }

  $scope.createMoment = function() {
    $http.post(api('moments'), {moment: $scope.newMoment}).success(function(moment) {
      $scope.moments.unshift(moment)
      $scope.closeNewMoment()
    })
  }

  $scope.addPhoto = function(attrs) {
    $scope.newMoment.photos.push(attrs)
  }

  $scope.removePhoto = function(photo) {
    $http.delete(api('/photos/', photo.id))
    _.remove($scope.newMoment.photos, {id: photo.id})
  }
})