//= require_self
//= require_tree ./react
//= require_tree ./directives
//= require_tree ./services

if (typeof Function.empty === 'undefined')
  Function.empty = function() {}

if (typeof Function.stopPropagation === 'undefined')
  Function.stopPropagation = function(e) {e.stopPropagation()}

App = angular.module('app', ['pasvaz.bindonce', 'ajoslin.promise-tracker'])

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

App.constant('d3', d3)
App.constant('jquery', jQuery)
App.constant('cookies', Cookies)

App.run(['$rootScope', 'promiseTracker', 'routes', 'api', function($rootScope, promiseTracker, routes, api) {
  $rootScope.appTracker = promiseTracker('appTracker', {
    activationDelay: 100
  })

  $rootScope.routes = routes
  $rootScope.api = api
}])