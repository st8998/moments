angular.module('app').factory('PhotoSet', function($http, $cacheFactory, api, $q) {

  var cache = $cacheFactory('photoSets', {number: 5})

  function getData(response) {
    return response.data
  }

  return {
    get: function(key) {
      if (cache.get(key)) {
        return cache.get(key)
      } else {
        var promise = $http.get(api('photo_sets', key)).then(getData)

        var deferred = $q.defer()
        promise.then(function(pics) {
          deferred.resolve(pics)
        })

        if (key.match(/all|top/)) {
          cache.put(key, deferred.promise)
        }

        return deferred.promise
      }
    }
  }

})