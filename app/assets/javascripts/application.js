// requirejs manageable libs
//= require almond
//= require routes

//= require_self

if (typeof Function.empty === 'undefined')
  Function.empty = function() {}

if (typeof Function.stopPropagation === 'undefined')
  Function.stopPropagation = function(e) {e.stopPropagation()}

window.sequence = (function() {
  var current = 0

  return function() {
    current += 1
    return current
  }
}())

define('settings', [], function() {
  return {
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
  }
})
