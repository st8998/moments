//= require directives/pictures_uploader
//= require directives/pictures_line
//= require directives/uploader
//= require models/picture

(function() {
  var app = angular.module('app')

  app.config(['apiProvider', function(api) {
    api.demoMode(true)
  }])

  var Picture

  function BlogCtrl($scope, picModel, api) {
    Picture = picModel

    this.api = api
    this.pictures = Picture.query()
    this.scope = $scope
  }

  BlogCtrl.prototype.addPicture = function(attrs) {
    this.pictures.push(new Picture(attrs))
  }

  BlogCtrl.prototype.removePicture = function(pic) {
    var pics = this.pictures
    pic.$delete(function() {
      pics.splice(pics.indexOf(pic), 1)
    })
  }

  app.controller('BlogCtrl', ['$scope', 'Picture', 'api', BlogCtrl])
}());