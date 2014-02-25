angular.module('app').factory('Pictures',
  ['$http', '$cacheFactory', 'Picture', 'api', '$q', 'lodash',
  function($http, $cacheFactory, Picture, api, $q, _) {

  var cache = $cacheFactory('pictureSets', {number: 5})

  function dataToPics(response) {
    return _.map(response.data, function(attrs) { return new Picture(attrs) })
  }

  function withPromise(func) {
    return function(key) {
      var deferred = $q.defer();

      (cache.get(key) || this.get(key)).then(func.bind(this, deferred, key, arguments[1]))

      if (cache.get(key))
        deferred.promise.collection = cache.get(key).collection
      cache.put(key, deferred.promise)

      return deferred.promise
    }
  }

  return {
    get: function(key) {
      if (cache.get(key)) {
        return cache.get(key)
      } else {
        var promise = $http.get(api(key)).then(dataToPics)

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
    },

    add: withPromise(function(deferred, key, picOrAttrs) {
      var pic = picOrAttrs.constructor.name === 'Picture' ? picOrAttrs : new Picture(picOrAttrs)

      $http.post(api(key, pic.id), pic.attributes()).success(function(attrs) {
        pic = new Picture(attrs)

        var pics = cache.get(key).collection
        pics.push(pic)
        deferred.resolve(pics)
      })
    }),

    remove: withPromise(function(deferred, key, pic) {
      $http.delete(api(key, pic.id)).success(function() {
        var pics = cache.get(key).collection
        _.remove(pics, {id: pic.id})
        deferred.resolve(pics)
      })
    }),

    update: withPromise(function(deferred, key, pic) {
      var attrs = pic.attributes !== undefined ? pic.attributes() : pic

      $http.put(api('pictures', pic.id), {picture: attrs})
      .success(function(attrs) {
        var pics = cache.get(key).collection
        _.find(pics, {id: pic.id}).assignAttributes(attrs)
        deferred.resolve(pics)
      })
      .error(function() {
        var pics = cache.get(key).collection
        deferred.resolve(pics)
      })
    })
  }

}])