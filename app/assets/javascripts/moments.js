//= require models/picture

angular.module('app').controller('MomentsCtrl', function($scope, $http, api, Picture, Pictures) {

  $http.get(api('moments')).success(function(data) {
    $scope.moments = data
  })

  $scope.createMoment = function() {
    $http.post(api('moments'), $scope.newMoment).success(function(moment) {
      $scope.moments.unshift(moment)
      $scope.newMoment = {}
    })
  }

})