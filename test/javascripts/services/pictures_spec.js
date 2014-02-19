describe('Pictures service', function() {
  var service, $httpBackend, $cacheFactory, Picture
    , picAttrs = [{id: 1}, {id: 2}]
    , getId = function(p) { return p.id }

  beforeEach(function() {
    module('app')

    inject(function($injector, cookies) {
      cookies.set('akey', 'test')

      $httpBackend = $injector.get('$httpBackend')
      $cacheFactory = $injector.get('$cacheFactory')
      service = $injector.get('Pictures')
      Picture = $injector.get('Picture')

      $httpBackend.when('GET', '/test/photostream').respond(picAttrs)
    })
  })

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('should return promise for pictures', function() {
    service.get('photostream').then(function(pics) {
      expect(pics.length).toBe(2)
      expect(_.map(pics, getId)).toEqual([1,2])
    })

    $httpBackend.flush()
  })

  it('should add picture to pictures', function() {
    var pic1 = {id: 3}

    $httpBackend.expect('POST', '/test/photostream/3', pic1).respond(pic1)

    service.add('photostream', new Picture(pic1))

    service.get('photostream').then(function(pics) {
      expect(pics.length).toBe(3)
      expect(_.map(pics, getId)).toEqual([1,2,3])
    })

    $httpBackend.flush()
  })

  it('should automatically convert attrs to picture', function() {
    var pic1 = {id: 3}
    var pic2 = new Picture({id: 4})

    $httpBackend.expect('POST', '/test/photostream/3', pic1).respond(pic1)
    $httpBackend.expect('POST', '/test/photostream/4', pic2).respond(pic2)

    service.add('photostream', pic1)
    service.add('photostream', pic2)

    service.get('photostream').then(function(pics) {
      expect(_.all(pics, function(p) {return p.constructor.name === 'Picture'} )).toBe(true)
      expect(_.map(pics, getId)).toEqual([1,2,3,4])
    })

    $httpBackend.flush()
  })

  it('should add pictures concurrently', function() {
    var pic1 = {id: 3}
    var pic2 = {id: 4}

    $httpBackend.expect('POST', '/test/photostream/3', pic1).respond(pic1)
    $httpBackend.expect('POST', '/test/photostream/4', pic2).respond(pic2)

    service.add('photostream', pic1)
    service.add('photostream', pic2)

    service.get('photostream').then(function(pics) {
      expect(pics.length).toBe(4)
      expect(_.map(pics, getId)).toEqual([1,2,3,4])
    })

    $httpBackend.flush()
  })

  it('should remove pictures', function() {
    var pic1 = new Picture(picAttrs[0])
    var pic2 = new Picture(picAttrs[1])
    $httpBackend.expect('DELETE', '/test/photostream/1').respond('ok')
    $httpBackend.expect('DELETE', '/test/photostream/2').respond('ok')

    service.remove('photostream', pic1)
    service.remove('photostream', pic2)

    service.get('photostream').then(function(pics) {
      expect(pics.length).toBe(0)
    })

    $httpBackend.flush()
  })

  it('should provide watchable collections', function() {
    var pic1 = {id: 3}

    expect(service.getCollection('photostream')).toEqual(undefined)

    service.get('photostream').then(function() {
      expect(_.map(service.getCollection('photostream'), getId)).toEqual([1,2])
    })

    $httpBackend.expect('POST', '/test/photostream/3', pic1).respond(pic1)
    service.add('photostream', pic1).then(function() {
      expect(_.map(service.getCollection('photostream'), getId)).toEqual([1,2,3])
    })

    $httpBackend.expect('DELETE', '/test/photostream/1').respond('ok')
    service.remove('photostream', {id: 1}).then(function(pics) {
      expect(_.map(service.getCollection('photostream'), getId)).toEqual([2,3])
    })

    $httpBackend.flush()
  })

  it('should work after cache invalidation', function() {
    var picsCache = $cacheFactory.get('pictureSets')

    service.get('photostream').then(function(pics) {
      expect(_.map(service.getCollection('photostream'), getId)).toEqual([1,2])

      picsCache.removeAll()
      expect(service.getCollection('photostream')).toEqual(undefined)

      service.get('photostream').then(function(pics) {
        expect(_.map(service.getCollection('photostream'), getId)).toEqual([1,2])
      })
    })

    $httpBackend.flush()
  })
})