describe('PicturesService', function() {
  var service

  beforeEach(function() {
    module('app')

    inject(function(routes, Pictures) {
      service = Pictures
    })
  })

  it('should have pictures method', function() {
    expect(angular.isFunction(service.pictures)).toBe(true)
  })
})