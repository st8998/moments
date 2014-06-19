angular.module('app').factory('Moment', function(sequence) {
  /**
   * @property {Number} id server side picture id
   * @property {String} description
   */
  function Moment(attrs) {
    _.extend(this, {photos: [], uid: sequence('moment-'), can_update: true}, attrs)
  }

  Moment.fromJson = function(data) {
    function buildMoment(attrs) {
      var moment = new Moment(attrs)

      moment.newMoment = new Moment({parent_id: moment.id})

      moment.sub_moments = moment.sub_moments ?
        _.map(moment.sub_moments, function(attrs) {return new Moment(_.merge({parent: moment}, attrs))}) : []

      return moment
    }

    if (_.isArray(data)) {
      return _.map(data, buildMoment)
    } else {
      return buildMoment(data)
    }
  }

  Moment.prototype.galleryPhotos = function() {
    return this.parent ? this.parent.photo_set : this.photo_set
  }

  Moment.prototype.attributes = function() {
    return _.pick(this, 'id', 'description', 'photos', 'date', 'parent_id')
  }

  Moment.prototype.assignAttributes = function(attrs) {
    _.extend(this, attrs)
  }

  function groupBy(collection, attr) {
    return _.reduce(collection, function(out, attrs) {
      out[attrs[attr]] = attrs
      return out
    }, {})
  }

  return Moment
})