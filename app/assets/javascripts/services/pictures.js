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

        $http.post(api(key, pic.id), pic.attributes()).success(function(attrs) {
          pic = new Picture(attrs)

          pictureSets[key].push(pic)
          deferred.resolve(pictureSets[key])
        })
      })

      return promises[key] = deferred.promise
    },

    remove: function(key, pic) {
      var deferred = $q.defer();

      (promises[key] || this.pictures(key)).then(function() {
        $http.delete(api(key, pic.id)).success(function() {
          var pics = pictureSets[key]

          pics.splice(pics.indexOf(pic), 1)

          deferred.resolve(pictureSets[key])
        })
      })

      return promises[key] = deferred.promise
    }
  }

}])