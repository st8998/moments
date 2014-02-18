//= require models/picture

angular.module('app').controller('PhotostreamCtrl',
  ['$scope', '$http', 'api', 'Picture', 'Pictures',
  function($scope, $http, api, Picture, Pictures) {

  this.Pictures = Pictures

  Pictures.pictures('photostream').then(function(pics) {
    $scope.pictures = pics
  })
}])