describe('classInterceptor', function() {
  var $httpBackend, $http

  function Test(attrs) {_.extend(this, attrs) }
  function Test2(attrs) {_.extend(this, attrs) }

  Test.prototype.attributes = function() {
    return _.pick(this, 'id', 'children', 'parent')
  }

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

    var data
    $http.get('/test').success(function(d) {data = d})

    $httpBackend.flush()
    expect(data).toEqual('driller')
  })

  it('should bypass attributes without class declaration', function() {
    $httpBackend.expect('GET', '/test').respond({joppa: 'driller'})

    var data
    $http.get('/test').success(function(d) {data = d})

    $httpBackend.flush()
    expect(data).toEqual({joppa: 'driller'})
  })

  it('should bypass not declared classes', function() {
    $httpBackend.expect('GET', '/test').respond({'class_name': 'NotDeclared'})

    var data
    $http.get('/test').success(function(d) {data = d})

    $httpBackend.flush()
    expect(data).toEqual({'class_name': 'NotDeclared'})
  })


  it('should load class from single level object', function() {
    $httpBackend.expect('GET', '/test').respond({'class_name': 'Test', joppa: 'driller'})

    var data
    $http.get('/test').success(function(d) {data = d})

    $httpBackend.flush()
    expect(data.constructor).toBe(Test)
    expect(data.joppa).toBe('driller')
  })

  it('should load classes from single level array of object', function() {
    $httpBackend.expect('GET', '/test').respond([{'class_name': 'Test'}, {'class_name': 'Test2'}])

    var data
    $http.get('/test').success(function(d) {data = d})

    $httpBackend.flush()
    var constructors = _.map(data, function(item) {
      return item.constructor
    })

    expect(constructors).toEqual([Test, Test2])
  })

  it('should load classes from nested objects', function() {
    $httpBackend.expect('GET', '/test').respond({
      'class_name': 'Test',
      parent: {'class_name': 'Test', parent: {'class_name': 'Test2'}},
      children: [{'class_name': 'Test'}, {'class_name': 'Test2'}]
    })

    var data
    $http.get('/test').success(function(d) {data = d})

    $httpBackend.flush()
    expect(data.parent.constructor).toEqual(Test)
    expect(data.parent.parent.constructor).toEqual(Test2)

    var constructors = _.map(data.children, function(item) {
      return item.constructor
    })
    expect(constructors).toEqual([Test, Test2])
  })

//  it('should load classes extremely fast', function() {
//    var data = []
//    for(var i = 0; i < 1000; i++) {
//      data.push({'class_name': 'Test'})
//    }
//
//    $httpBackend.expect('GET', '/test').respond(data)
//
//    var start = Date.now()
//
//    var data
//    $http.get('/test').success(function(d) {data = d})
//
//    $httpBackend.flush()
//    var execTime = Date.now() - start
//    console.log('1000: '+execTime+'ms')
//    expect(execTime).toBeLessThan(100)
//  })

  it('should bypass attributes without param_name', function() {
    var data = {a: 12, b: 13}

    $httpBackend.expectPOST('/test', {a: 12, b: 13}).respond({})
    $http.post('/test', data)
    $httpBackend.flush()
  })

  it('should dump single level classes without param_name', function() {
    var data = new Test({id: 12, name: 'some'})

    $httpBackend.expectPOST('/test', {id: 12}).respond({})
    $http.post('/test', data)
    $httpBackend.flush()
  })

  it('should dump single level classes with param_name', function() {
    var data = new Test({id: 12, name: 'some', param_name: 'test'})

    $httpBackend.expectPOST('/test', {test: {id: 12}}).respond({})
    $http.post('/test', data)
    $httpBackend.flush()
  })

  it('should dump nested classes with param_name', function() {
    var data = new Test({
      id: 12, name: 'some', param_name: 'test',
      parent: new Test({id: 14, name: 'another'}),
      children: [new Test({id: 13, name: 'some', param_name: 'test'})]
    })

    $httpBackend.expectPOST('/test', {test: {id: 12, parent: {id: 14}, children: [{id: 13}]}}).respond({})
    $http.post('/test', data)
    $httpBackend.flush()
  })

})