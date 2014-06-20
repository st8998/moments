angular.module('app').factory('Moment', function(sequence, Place) {
  /**
   * @property {Number} id server side picture id
   * @property {String} description
   */
  function Moment(attrs) {
    this.assignAttributes(_.merge({photos: [], uid: sequence('moment-'), can_update: true}, attrs))
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
    if (this.parent) {
      return this.parent.galleryPhotos()
    } else {
      return _.reduce(this.sub_moments, function(photos, moment) {
        return photos.concat(moment.photos)
      }, this.photos)
    }
  }

  Moment.prototype.attributes = function() {
    var attrs = _.pick(this, 'id', 'description', 'photos', 'date', 'parent_id')
    attrs.place = this.place.attributes()

    return attrs
  }

  Moment.prototype.assignAttributes = function(attrs) {
    _.extend(this, attrs)

    if (this.place && _.isPlainObject(this.place)) {
      this.place = new Place(this.place)
    }
  }

  function groupBy(collection, attr) {
    return _.reduce(collection, function(out, attrs) {
      out[attrs[attr]] = attrs
      return out
    }, {})
  }

  return Moment
})