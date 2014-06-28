angular.module('app').factory('loadClassInterceptor', function($q, $injector) {
  return {
    response: function(response) {
      var deferred = $q.defer()
      var attrs = response.data

      function loadClass(attrs) {
        var loadDefer = $q.defer()

        if (attrs.class) {
          try {
            $injector.invoke([attrs.class, function(constructor) {
              loadDefer.resolve(new constructor(attrs))
            }])
          } catch(e) {
            loadDefer.resolve(attrs)
          }
        } else {
          loadDefer.resolve(attrs)
        }

        return loadDefer.promise
      }

      function resolveResponse(data) {
        response.data = data
        deferred.resolve(response)
      }

      if (_.isPlainObject(attrs)) {
        loadClass(attrs).then(resolveResponse)
      }

      if (_.isArray(attrs)) {
        $q.all(_.map(attrs, loadClass)).then(resolveResponse)
      }

      return deferred.promise
    }
  }
})
