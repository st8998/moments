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
          cache.get(key).collection = pics
          deferred.resolve(pics)
        })

        cache.put(key, deferred.promise)

        return deferred.promise
      }
    },

    getCollection: function(key) {
      return cache.get(key) ? cache.get(key).collection : undefined
    }
  }

})