angular.module('app').factory('Picture',
  ['$resource', 'api', 'sequence', function($resource, api, seq) {
  /**
   * @property {Number} id server side picture id
   * @property {String} description
   * @property {Number} width original image width
   * @property {Number} height original image height
   * @property {String} image_url_small 512x512 image url
   * @property {String} image_url_normal 1024x1024 image url
   * @property {String} image_url_big 2048x2048 image url
   *
   * @property {Number} thWeight thumbnail width
   * @property {Number} thHeight thumbnail height
   * @property {Number} thLeft thumbnail left offset
   * @property {Number} thTop thumbnail top offset
   * @property {String} image_data thumbnail base64 image string
   * @property {Number} progress current upload progress
   * @property {object} dzFile dropzone file model link
   */
  var Picture = $resource(
    api('/pictures/:id'), {
      id: '@id'
    })

  Picture.prototype.uid = function() {
    return this._uid || this._getUid()
  }
  Picture.prototype._getUid = function() {
    this._uid = this.id ? 'pic-p-'+this.id : seq('pic-t-')
    return this._uid
  }

  Picture.prototype.assignAttributes = function(attrs) {
    _.extend(this, attrs)
  }

  Picture.prototype.extractDropzoneAttrs = function(file) {
    var resizeInfo = Picture.resize(file)
    this.width = resizeInfo.trgWidth
    this.height = resizeInfo.trgHeight
    return this
  }

  Picture.prototype.getContainerStyle = function() {
    return {
      height: this.thHeight || this.height,
      width: this.thWidth || this.width,
      left: this.cLeft || 0
    }
  }

  Picture.prototype.getImageStyle = function() {
    return {
      height: this.thTop ? (this.thHeight - this.thTop * 2) : this.thHeight || this.height,
      width: this.thLeft ? (this.thWidth - this.thLeft * 2) : this.thWidth || this.width,
      top: this.thTop || 0,
      left: this.thLeft || 0
    }
  }

  Picture.prototype.getUrl = function() {
    if (this.image_url_big && (this.thHeight > 1024 || this.thWidth > 1024))
      return this.image_url_big
    if (this.image_url_normal && (this.thHeight > 512 || this.thWidth > 512))
      return this.image_url_normal
    if (this.image_url_small)
      return this.image_url_small
    if (this.image_data)
      return this.image_data
  }

  Picture.fitInRow = function(pics, maxWidth, maxHeight) {
    // adapt all images to same height of Picture.maxHeight
    _.each(pics, function(pic) {
      pic.resizeToHeight(maxHeight)
    })

    var totalWidth = _.reduce(pics, function(memo, pic) {
      return memo + pic.thWidth
    }, 0)

    if (maxWidth) {
      // +2px is visual enhancements to cover gap after flooring
      // 3px is a gap between two images
      var ratio = (maxWidth + 2 - (pics.length - 1) * 3) / totalWidth

      // adjust height/width of each images according ratio
      // clean up any enhancements
      _.each(pics, function(pic) {
        // remove any top offset optimization
        pic.thTop = 0
        pic.thLeft = 0

        pic.thWidth = Math.floor(pic.thWidth * ratio)
        pic.thHeight = Math.floor(pic.thHeight * ratio)

        // keep watching for maxThumb height
        if (pic.thHeight > maxHeight)
          pic.resizeToHeight(maxHeight)
      })
    }
  }

  Picture.enhanceRowWidth = function(pics, maxWidth, enhanceRatioWidth) {
    var totalWidth = _.reduce(pics, function(memo, pic) {
      return memo + pic.thWidth
    }, 0)
    var ratio = totalWidth / (maxWidth + 2 - (pics.length - 1) * 3)

    // if total width more then Picture.enhanceRatio of row width
    // crop all images center weighted
    if (enhanceRatioWidth < ratio && ratio < 0.99) {
      _.each(pics, function(pic) {
        pic.thWidth = Math.floor(pic.thWidth / ratio)
        pic.thTop = -Math.floor((pic.thHeight / ratio - pic.thHeight) / 2)
      })
    }
  }

  Picture.enhanceRowHeight = function(pics, maxHeight, enhanceRatioHeight) {
    if (pics.length && pics[0].thHeight < maxHeight) {
      var height = pics[0].thHeight
      var ratio = height / maxHeight

      // take ratio that will make minimum impact
      // max between current ratio an configured one
      var enhanceRatio = enhanceRatioHeight > ratio ? enhanceRatioHeight : ratio

      _.each(pics, function(pic) {
        pic.thHeight = Math.floor(pic.thHeight / enhanceRatio)
        pic.thLeft = -Math.floor((pic.thWidth / enhanceRatio - pic.thWidth) / 2)
      })
    }
  }

  Picture.updateOffsets = function(pics, offset) {
    offset = offset || {}
    var left = offset.left || 0
    var top = offset.top || 0

    _.each(pics, function(pic) {
      pic.cLeft = left
      pic.cTop = top
      left += pic.thWidth + 3
    })
  }

  Picture.prototype.resizeToHeight = function(toHeight) {
    var ratio = this.height / toHeight

    this.thWidth = this.width / ratio
    this.thHeight = toHeight

    return this
  }

  Picture.thumbnailSize = 512
  Picture.resize = function(file) {
    var info, ratio
    info = {
      srcX: 0,
      srcY: 0,
      srcWidth: file.width,
      srcHeight: file.height
    };

    if (file.width == file.height) {
      info.trgWidth = Picture.thumbnailSize
      info.trgHeight = Picture.thumbnailSize
    }

    if (file.width < file.height) {
      ratio = file.height / Picture.thumbnailSize

      info.trgWidth = info.srcWidth / ratio
      info.trgHeight = Picture.thumbnailSize
    }

    if (file.width > file.height) {
      ratio = file.width / Picture.thumbnailSize

      info.trgWidth = Picture.thumbnailSize
      info.trgHeight = info.srcHeight / ratio
    }

    return info;
  }

  return Picture
}])