angular.module('app').factory('Pictures',
  ['$http', '$cacheFactory', 'Picture', 'api', '$q', 'lodash',
  function($http, $cacheFactory, Picture, api, $q, _) {

  var cache = $cacheFactory('pictureSets', {number: 5})

  function dataToPics(response) {
    return _.map(response.data, function(attrs) { return new Picture(attrs) })
  }

  return {
    get: function(key) {
      if (cache.get(key)) {
        return cache.get(key).promise
      } else {
        var promise = $http.get(api(key)).then(dataToPics)

        var deferred = $q.defer()
        promise.then(function(pics) {
          cache.get(key).collection = pics
          deferred.resolve(pics)
        })

        cache.put(key, {promise: deferred.promise})

        return deferred.promise
      }
    },

    getCollection: function(key) {
      console.log('getCollection')

      return cache.get(key) ? cache.get(key).collection : undefined
    },

    add: function(key, picOrAttrs) {
      var deferred = $q.defer();

      if (!cache.get(key))
        this.get(key)

      cache.get(key).promise.then(function() {
        var pic = picOrAttrs.constructor.name === 'Picture' ? picOrAttrs : new Picture(picOrAttrs)

        $http.post(api(key, pic.id), pic.attributes()).success(function(attrs) {
          pic = new Picture(attrs)

          var pics = cache.get(key).collection
          pics.push(pic)
          deferred.resolve(pics)
        })
      })

      var cacheRecord = (cache.get(key) || {})
      cacheRecord.promise = deferred.promise
      cache.put(cacheRecord)

      return deferred.promise
    },

    remove: function(key, pic) {
      var deferred = $q.defer();

      if (!cache.get(key))
        this.get(key)

      cache.get(key).promise.then(function() {
        $http.delete(api(key, pic.id)).success(function() {
          var pics = cache.get(key).collection
          var index = _.findIndex(pics, function(p) { return p.id == pic.id })
          pics.splice(index, 1)
          deferred.resolve(pics)
        })
      })

      var cacheRecord = (cache.get(key) || {})
      cacheRecord.promise = deferred.promise
      cache.put(cacheRecord)

      return deferred.promise
    }
  }

}])