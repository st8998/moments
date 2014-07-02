App = angular.module('app', [])

App.constant('d3', d3)
App.constant('jquery', jQuery)
App.constant('cookies', Cookies)
App.constant('lodash', _)

App.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('classInterceptor');
}])
