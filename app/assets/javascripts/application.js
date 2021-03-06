//= require_self
//= require map_style
//= require_tree ./directives
//= require_tree ./services
//= require_tree ./models

//= require linear_partition

if (typeof Function.empty === 'undefined')
  Function.empty = function() {}

if (typeof Function.stopPropagation === 'undefined')
  Function.stopPropagation = function(e) {e.stopPropagation()}

App = angular.module('app', ['templates', 'ajoslin.promise-tracker'])

App.constant('settings', {
})

moment.locale('ru')

App.constant('d3', d3)
App.constant('jquery', jQuery)
App.constant('progressJs', progressJs)
App.constant('cookies', Cookies)
App.constant('lodash', _)
App.constant('$moment', moment)

App.run(['$rootScope', 'promiseTracker', 'routes', 'api', function($rootScope, promiseTracker, routes, api) {
  $rootScope.appTracker = promiseTracker('appTracker', {
    activationDelay: 100
  })

  $rootScope.routes = routes
  $rootScope.api = api
}])

App.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('classInterceptor')
}])
