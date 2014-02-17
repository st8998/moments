angular.module('app').factory('Pictures', ['Picture', '$http', 'api', '$q', 'lodash',
  function(Picture, $http, api, $q, _) {

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
        var promise = $http.get(api(key)).then(dataToPics)

        var deferred = $q.defer()
        promise.then(function(pics) {
          pictureSets[key] = pics
          deferred.resolve(pics)
        })

        return promises[key] = deferred.promise
      }
    },

    add: function(key, picOrAttrs) {
      var deferred = $q.defer();

      (promises[key] || this.pictures(key)).then(function() {
        var pic = picOrAttrs.constructor.name === 'Picture' ? picOrAttrs : new Picture(picOrAttrs)

        pictureSets[key].push(pic)
        deferred.resolve(pictureSets[key])
      })

      return promises[key] = deferred.promise
    }
  }

}])