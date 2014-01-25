angular.module('app').provider('api', function() {
  var demo = false

  this.demoMode = function(demoMode) {
    demo = demoMode
  }

  function buildApi(key) {
    function routeBuilder() {
      return ('/' + key + '/' + Array.prototype.join.call(arguments, '/')).replace(/\/\//g, '/')
    }

    routeBuilder.getKey = function() {return key}

    return routeBuilder
  }

  this.$get = ['$http', 'cookies', function($http, cookies) {
    // TODO think about failure scenario, no akey cookie for example
    // not demo api should have akey cookies setup in any cases
    if (demo) {
      return buildApi(cookies.get('dakey'))
    } else {
      return buildApi(cookies.get('akey'))
    }
  }]
})