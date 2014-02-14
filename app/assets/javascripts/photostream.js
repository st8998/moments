//= require models/picture

angular.module('app').controller('PhotostreamCtrl',
  ['$scope', '$http', 'api', 'Picture', 'Pictures', function($scope, $http, api, Picture, Pictures) {

  this.addPicture = function(attrs) {
    var pic = new Picture(attrs)

    $scope.pictures.unshift(pic)
    $http.post(api('/photostream', pic.id), {tracker: 'appTracker'})
  }

  this.removePicture = function(pic) {
    $scope.pictures.splice($scope.pictures.indexOf(pic), 1)
    $http.delete(api('/photostream', pic.id), {tracker: 'appTracker'})
  }

  Pictures.pictures('photostream').then(function(pics) {
    $scope.pictures = pics
  })
}])