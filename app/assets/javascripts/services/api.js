angular.module('app').provider('api', function() {
  var demo = false

  this.demoMode = function(demoMode) {
    demo = demoMode
  }

  function buildApi(key) {
    function routeBuilder() {
      return ('/api/v1/' + key + '/' + Array.prototype.join.call(arguments, '/')).replace(/\/\//g, '/')
    }

    routeBuilder.getKey = function() {return key}

    return routeBuilder
  }

  this.$get = ['$http', 'cookies', function($http, cookies) {
    if (demo) {
      // if token is already requested use it
      if (cookies.get('dakey')) {
        return buildApi(cookies.get('dakey'))
      } else { // request a new demo token and store it in dakey cookie
        var keyPromise = $http.post('/api/v1/accounts/demo')

        keyPromise.success(function(attrs) {
          // TODO refactor expire date and path somehow
          cookies.set('dakey', attrs.key, {path: '/blog', expires: '2015/01/01'})
          return buildApi(attrs.key)
        })

        return keyPromise
      }
    } else {
      // TODO think about failure scenario, no akey cookie for example
      // not demo api should have akey cookies setup in any cases
      return buildApi(cookies.get('akey'))
    }
  }]
})