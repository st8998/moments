angular.module('app').factory('classInterceptor', function($q, $injector) {
  return {
    request: function(config) {
      function dump(model) {
        if (model.attributes !== undefined) {
          var attrs = model.attributes()

          _.each(attrs, function(value, name) {
            if (_.isArray(value)) {
              attrs[name] = _.map(value, dump)
            } else if (_.isObject(value)) {
              attrs[name] = dump(value)
            }
          })

          return attrs
        } else {
          return model
        }
      }

      if (config.data) {
        if (config.data.param_name) {
          var data = {}
          data[config.data.param_name] = dump(config.data)

          config.data = data
        } else {
          config.data = dump(config.data)
        }
      }

      return config
    },

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
          } catch (e) {
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
