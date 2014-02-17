describe('sequence service', function() {
  var seq

  beforeEach(function() {
    module('app')
    inject(function(sequence) { seq = sequence })
  })

  it('should generate plain number sequence', function() {
    expect(seq()).toBe('1')
    expect(seq()).toBe('2')
  })

  it('should generate prefixed sequences', function() {
    expect(seq('prefix-')).toBe('prefix-1')
    expect(seq('prefix-')).toBe('prefix-2')
  })
})