describe('api service', function() {
  inject(function(api, cookies) {
    cookies.set('akey', 'test')

    it('should provide api key', function() {
      expect(api.getKey()).toBe('test')
    })

    it('should build correct paths', function() {
      expect(api('/pictures')).toBe('/test/pictures')
      expect(api('/pictures', 12)).toBe('/test/pictures/12')
    })
  })
})