//= require_self
//= require services/api
//= require_tree ./react

if (typeof Function.empty === 'undefined')
  Function.empty = function() {}

if (typeof Function.stopPropagation === 'undefined')
  Function.stopPropagation = function(e) {e.stopPropagation()}

App = angular.module('app', ['ngResource'])

App.constant('settings', {
  map: {
    key: 'AIzaSyA6t72tJ8MY1E6HkWTe0GqrpXnegDYCEf4',
    typeToZoom: {
      country: 5,
      administrative_area_level_1: 8,
      locality: 11,
      route: 15,
      street_number: 18
    }
  }
})

App.factory('sequence', function() {
  var current = 0

  return function(prefix) {
    current += 1
    return '' + (prefix || '') + current
  }
})

App.constant('cookies', Cookies)