//= require models/picture

angular.module('app').controller('PhotostreamCtrl',
  ['$scope', '$http', 'api', 'Picture', function($scope, $http, api, Picture) {

  this.api = api

  this.addPicture = function(attrs) {
    var pic = new Picture(attrs)

    $scope.pictures.unshift(pic)
    $http.post(api('/photostream', pic.id), {tracker: 'appTracker'})
  }

  this.removePicture = function(pic) {
    $scope.pictures.splice($scope.pictures.indexOf(pic), 1)
    $http.delete(api('/photostream', pic.id), {tracker: 'appTracker'})
  }

  $http.get(api('/photostream'), {tracker: 'appTracker'}).success(function(data) {
    $scope.pictures = _.map(data, function(attrs) { return new Picture(attrs) })
  })

}])