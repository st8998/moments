angular.module('app').factory('Moment', function(sequence) {
  /**
   * @property {Number} id server side picture id
   * @property {String} description
   */
  function Moment(attrs) {
    _.extend(this, {photos: []}, attrs)
  }

  return Moment
})