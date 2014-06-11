angular.module('app').directive('mAutofocus', function() {
  return {
    restrict: 'A',
    link: function(scope, input) {
      input.get(0).focus()
    }
  }
})