angular.module('app').factory('Moment', function(sequence) {
  /**
   * @property {Number} id server side picture id
   * @property {String} description
   */
  function Moment(attrs) {
    _.extend(this, {photos: []}, attrs)
  }

  Moment.prototype.attributes = function() {
    return _.pick(this, 'id', 'description', 'photos', 'date')
  }

  Moment.prototype.assignAttributes = function(attrs) {
    _.extend(this, attrs)
  }

  return Moment
})