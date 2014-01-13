angular.module('app').directive('mGallery', [function() {

  return {
    restrict: 'AE',
    controller: function() {
      this.test = function() {
        console.log('GALLERY TEST')
      }
    },
    compile: function(elem, attrs) {
      elem.append('<div class="gallary-component"></div>')
    }
  }

}])