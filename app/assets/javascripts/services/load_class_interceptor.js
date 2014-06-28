angular.module('app').factory('loadClassInterceptor', function($q, $injector) {
  return {
    response: function(response) {
      var deferred = $q.defer()
      var attrs = response.data

      function loadClass(attrs) {
        var loadDefer = $q.defer()

        if (attrs.class_name) {
          try {
            $injector.invoke([attrs.class_name, function(constructor) {
              var object = new constructor(attrs)

              var suitableAttrDefers = []
              _.each(object, function(val, key) {
                function resolve(objectOrObjects) {
                  object[key] = objectOrObjects
                }

                if (_.isPlainObject(val)) {
                  suitableAttrDefers.push(loadClass(val).then(resolve))
                }

                if (_.isArray(val)) {
                  suitableAttrDefers.push($q.all(_.map(val, loadClass)).then(resolve))
                }
              })

              $q.all(suitableAttrDefers).then(function() {
                loadDefer.resolve(object)
              })
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

      if (_.isArray(attrs)) {
        $q.all(_.map(attrs, loadClass)).then(resolveResponse)
      } else if (_.isPlainObject(attrs)) {
        loadClass(attrs).then(resolveResponse)
      } else {
        deferred.resolve(response)
      }

      return deferred.promise
    }
  }
})
