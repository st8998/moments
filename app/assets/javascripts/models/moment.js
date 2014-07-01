angular.module('app').factory('Moment', function(sequence, Place) {
  /**
   * @property {Number} id server side picture id
   * @property {String} description
   */
  function Moment(attrs) {
    this.assignAttributes(_.merge({
      photos: [],
      uid: sequence('moment-'),
      can_update: true
    }, attrs))

    if (!this.parent_id && !this.newMoment && this.id) {
      this.newMoment = new Moment({parent_id: this.id})
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
    if (this.place)
      attrs.place = this.place.attributes()

    return attrs
  }

  Moment.prototype.assignAttributes = function(attrs) {
    _.extend(this, attrs)

    if (this.place && _.isPlainObject(this.place)) {
      this.place = new Place(this.place)
    }
  }

  Moment.prototype.galleryKey = function() {
    return 'moment/' + (this.parent_id ? this.parent_id : this.id)
  }

  function groupBy(collection, attr) {
    return _.reduce(collection, function(out, attrs) {
      out[attrs[attr]] = attrs
      return out
    }, {})
  }

  return Moment
})