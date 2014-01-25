//= require models/picture

(function() {

  var app = angular.module('app')

  app.config(['apiProvider', function(api) {
    api.demoMode(true)
  }])

  app.controller('BlogCtrl', ['$http', '$scope', 'Picture', 'api', function($http, $scope, Picture, api) {
    $scope.pictures = Picture.query()

    this.api = api

    this.shufflePictures = function() {
      $scope.pictures = _.shuffle($scope.pictures)
    }

    this.reorder = function() {
//      var ids = _.map($scope.pictures, function(pic) { return pic.id })
//
//      $http.post(api('/pictures/reorder'), {pictures: ids})
    }

    this.addPicture = function(attrs) {
      $scope.pictures.push(new Picture(attrs))
    }

    this.removePicture = function(pic) {
      var pics = $scope.pictures
      pic.$delete(function() {
        pics.splice(pics.indexOf(pic), 1)
      })
    }
  }])

}())