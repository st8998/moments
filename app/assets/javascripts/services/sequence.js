angular.module('app').factory('sequence', function() {
  var current = 0

  return function(prefix) {
    current += 1
    return '' + (prefix || '') + current
  }
})
