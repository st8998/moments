angular.module('app').filter('mGoogleMapImage', function(Place) {
  return function(attrs, opts) {
    if (!attrs) return

    return (attrs.constructor === Place ? attrs : new Place(attrs)).imageUrl(opts)
  }
})