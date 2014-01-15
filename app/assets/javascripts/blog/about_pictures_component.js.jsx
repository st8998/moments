//= require models/picture

(function() {
  var app = angular.module('app')

  app.config(['apiProvider', function(api) {
    api.demoMode(true)
  }])

  var Picture

  function BlogCtrl($http, $scope, picModel, api) {
    Picture = picModel
    this.$http = $http

    this.api = api
    this.pictures = Picture.query()
    this.scope = $scope
  }

  BlogCtrl.prototype.shufflePictures = function() {
    this.pictures = _.shuffle(this.pictures)
  }

  BlogCtrl.prototype.reorder = function() {
    var ids = _.map(this.pictures, function(pic) { return pic.id })

    this.$http.post(this.api('/pictures/reorder'), {pictures: ids})
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

  app.controller('BlogCtrl', ['$http', '$scope', 'Picture', 'api', BlogCtrl])
}());