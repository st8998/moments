angular.module('app').factory('routes', [function() {
  function Routes() {
    this.register = function(name, func) {
      this[name] = func
    }
  }

  return new Routes()
}])