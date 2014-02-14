angular.module('app').factory('Pictures', ['Picture', '$http', 'api', '$q', function(Picture, $http, api, $q) {

  var pictureSets = {}
  var promises = {}

  function dataToPics(response) {
    return _.map(response.data, function(attrs) { return new Picture(attrs) })
  }

  return {
    pictures: function(key) {
      if (promises[key]) {
        return promises[key]
      } else {
        var promise = $http.get(api('/photostream')).then(dataToPics)

        var deferred = $q.defer()
        promise.then(function(pics) {
          pictureSets[key] = pics
          deferred.resolve(pics)
        })

        promises[key] = deferred.promise

        return deferred.promise
      }
    },

    add: function(key, pic) {
      var deferred = $q.defer()
      promises[key] = deferred.promise

      pictureSets[key].push(pic)
      deferred.resolve(pictureSets[key])

      return deferred.promise
    }
  }

}])