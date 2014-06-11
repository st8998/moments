angular.module('app').factory('Moment', function(sequence) {
  /**
   * @property {Number} id server side picture id
   * @property {String} description
   */
  function Moment(attrs) {
    _.extend(this, {photos: [], date: new Date()}, attrs)
  }

  Moment.prototype.attributes = function() {
    return _.pick(this, 'id', 'description', 'photos', 'date')
  }

  return Moment
})