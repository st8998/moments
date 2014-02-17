describe('Pictures service', function() {
  var picService

  beforeEach(function() {
    module('app')

    inject(function(Pictures) {
      picService = Pictures
    })
  })

  it('should have pictures method', function() {
    expect(angular.isFunction(picService.pictures)).toBe(true)
  })
})