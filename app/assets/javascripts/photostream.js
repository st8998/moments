//= require models/picture

angular.module('app').controller('PhotostreamCtrl',
  ['$scope', '$http', '$cacheFactory', 'api', 'Picture', 'Pictures',
  function($scope, $http, $cacheFactory, api, Picture, Pictures) {

  this.Pictures = Pictures

  Pictures.get('photostream')

  this.clearCache = function() {
    $cacheFactory.get('pictureSets').removeAll()
  }
}])