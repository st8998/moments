angular.module('app').factory('Moment', function(sequence) {
  /**
   * @property {Number} id server side picture id
   * @property {String} description
   */
  function Moment(attrs) {
    _.extend(this, {photos: [], uid: sequence('moment-')}, attrs)
  }

  Moment.prototype.attributes = function() {
    return _.pick(this, 'id', 'description', 'photos', 'date', 'parent_id')
  }

  Moment.prototype.assignAttributes = function(attrs) {
    _.extend(this, attrs)
  }



  return Moment
})