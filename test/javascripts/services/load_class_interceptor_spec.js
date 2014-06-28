describe('loadClassInterceptor', function() {
  var $httpBackend, $http

  function Test(attrs) {_.extend(this, attrs) }
  function Test2(attrs) {_.extend(this, attrs) }

  App.factory('Test', function() {
    return Test
  })

  App.factory('Test2', function() {
    return Test2
  })

  beforeEach(function() {
    module('app')

    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend')
      $http = $injector.get('$http')
    })
  })

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('should bypass not object attribute', function() {
    $httpBackend.expect('GET', '/test').respond('driller')

    $http.get('/test').success(function(data) {
      expect(data).toEqual('driller')
    })

    $httpBackend.flush()
  })

  it('should bypass attributes without class declaration', function() {
    $httpBackend.expect('GET', '/test').respond({joppa: 'driller'})

    $http.get('/test').success(function(data) {
      expect(data).toEqual({joppa: 'driller'})
    })

    $httpBackend.flush()
  })

  it('should bypass not declared classes', function() {
    $httpBackend.expect('GET', '/test').respond({'class': 'NotDeclared'})

    $http.get('/test').success(function(data) {
      expect(data).toEqual({'class': 'NotDeclared'})
    })

    $httpBackend.flush()
  })

  it('should load class from single level object', function() {
    $httpBackend.expect('GET', '/test').respond({'class': 'Test', joppa: 'driller'})

    $http.get('/test').success(function(data) {
      expect(data.constructor).toBe(Test)
      expect(data.joppa).toBe('driller')
    })

    $httpBackend.flush()
  })

  it('should load classes from single level array of object', function() {
    $httpBackend.expect('GET', '/test').respond([{'class': 'Test'}, {'class': 'Test2'}])

    $http.get('/test').success(function(data) {
      var constructors = _.map(data, function(item) {
        return item.constructor
      })

      expect(constructors).toEqual([Test, Test2])
    })

    $httpBackend.flush()
  })

  it('should load classes extremely fast', function() {
    var data = []
    for(var i = 0; i < 1000; i++) {
      data.push({'class': 'Test'})
    }

    $httpBackend.expect('GET', '/test').respond(data)

    var start = Date.now()

    $http.get('/test').success(function(data) {
      var execTime = Date.now() - start
      console.log('1000: '+execTime+'ms')
      expect(execTime).toBeLessThan(100)
    })

    $httpBackend.flush()
  })

})