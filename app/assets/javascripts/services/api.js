angular.module('app').factory('api', function() {
  function buildApi(key) {
    function routeBuilder() {
      return ('/' + key + '/' + Array.prototype.join.call(arguments, '/')).replace(/\/\//g, '/')
    }

    routeBuilder.getKey = function() {return key}

    return routeBuilder
  }

  return buildApi($('meta[name=akey]').attr('content'))
})