//= require widgets/moment_widget

angular.module('app').controller('MomentsCtrl', function($scope, $http, api, Moment, Place, $moment) {

  this.api = api

  var hashMatch
  if (hashMatch = window.location.hash.match(/photos\/([\w/]+)\/(\d+)$/)) {
    var galleryWatcher = $scope.$watch('openGallery', function(openGallery) {
      if (openGallery) {
        openGallery(hashMatch[1], parseInt(hashMatch[2]))
        galleryWatcher() // clear gallery watcher
      }
    })
  }

  $scope.place = new Place({name: 'SOME'})

  $scope.newMoment = new Moment()

  $http.get(api('moments')).success(function(data) {
    $scope.moments = data
  })

  $scope.createMoment = function() {
    if (!$scope.newMoment.date) $scope.newMoment.date = $moment().format('DD/MM/YYYY HH:mm')

    $http.post(api('moments'), $scope.newMoment).success(function(moment) {
      $scope.moments.unshift(moment)
      $scope.newMoment = new Moment()
    })
  }

  $scope.createSubMoment = function(moment) {
    if (!moment.newMoment.date) moment.newMoment.date = $moment().format('DD/MM/YYYY HH:mm')

    $http.post(api('moments'), moment.newMoment).success(function(attrs) {
      moment.sub_moments.push(new Moment(_.merge(attrs, {parent: moment})))
      moment.newMoment = new Moment({parent_id: moment.id})
    })
  }

  $scope.updateMoment = function(moment) {
    $http.put(api('moments', moment.id), moment).success(function(attrs) {
      moment.assignAttributes(attrs)
    })
  }

  $scope.removeMoment = function(moment) {
    _.remove($scope.moments, {id: moment.id})
    $http.delete(api('moments', moment.id))
  }

  $scope.removeSubMoment = function(moment, sub_moment) {
    _.remove(moment.sub_moments, {id: sub_moment.id})
    $http.delete(api('moments', sub_moment.id))
  }
})