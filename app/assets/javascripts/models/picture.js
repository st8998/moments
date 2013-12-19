
define('models/picture', [], function() {

  /**
   * @property {Number} id server side picture id
   * @property {String} description
   * @property {Number} width original image width
   * @property {Number} height original image height
   * @property {String} image_url_small 512x512 image url
   * @property {String} image_url_normal 1024x1024 image url
   * @property {String} image_url_big 2048x2048 image url
   *
   * @property {String} uiId uniq ui id
   * @property {Number} thWeight thumbnail width
   * @property {Number} thHeight thumbnail height
   * @property {Number} thLeft thumbnail left offset
   * @property {Number} thTop thumbnail top offset
   * @property {String} image_data thumbnail base64 image string
   * @property {Number} progress current upload progress
   * @property {object} dzFile dropzone file model link
   *
   *
   * @param {object} attrs picture attributes
   * @constructor
   */
  function Picture(attrs) {
    _.extend(this, attrs)
    this.uiId = 'pic-'+window.sequence()
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
      left: this.thLeft || 0
    }
  }

  Picture.prototype.getImageStyle = function() {
    return {
      height: this.thTop ? (this.thHeight - this.thTop*2) : this.thHeight || this.height,
      width: this.thWidth || this.width,
      top: this.thTop || 0
    }
  }

  Picture.prototype.getUrl = function() {
    if (this.image_url_normal && (this.thHeight > 512 || this.thWidth > 512))
      return this.image_url_normal
    if (this.image_url_small)
      return this.image_url_small
    if (this.image_data)
      return this.image_data
  }

  Picture.maxWidth = 800
  Picture.maxThumbHeight = 500
  Picture.enhanceRatio = 0.6
  Picture.fitThumbsInRow = function(pics) {
    // adapt all images to same height of Picture.maxHeight
    _.each(pics, function(pic) { pic.resizeThumbToHeight(Picture.maxThumbHeight) })

    var totalWidth = _.reduce(pics, function(memo, pic) {return memo+pic.thWidth}, 0)

    // +2px is visual enhancements to cover gap after flooring
    // 3px is a gap between two images
    var ratio = (Picture.maxWidth + 2 - (pics.length - 1)*3) / totalWidth

    var offset = 0

    // adjust height/width of each images according ratio
    // clean up any enhancements
    _.each(pics, function(pic) {
      // remove any top offset optimization
      pic.thTop = 0

      pic.thWidth = Math.floor(pic.thWidth * ratio)
      pic.thHeight = Math.floor(pic.thHeight * ratio)

      // keep watching for maxThumb height
      if (pic.thHeight > Picture.maxThumbHeight)
        pic.resizeThumbToHeight(Picture.maxThumbHeight)
    })

    // try to enhance row if it is narrower then row width
    Picture.enhanceThumbsInRow(pics)

    // calculate left offset
    _.each(pics, function(pic) {
      pic.thLeft = offset
      offset += pic.thWidth + 3
    })
  }

  Picture.enhanceThumbsInRow = function(pics) {
    var totalWidth = _.reduce(pics, function(memo, pic) {return memo+pic.thWidth}, 0)
    var ratio = totalWidth / (Picture.maxWidth + 2 - (pics.length - 1)*3)

    // if total width more then Picture.enhanceRatio of row width
    // crop all images center weighted
    if (Picture.enhanceRatio < ratio && ratio < 0.99) {
      _.each(pics, function(pic) {
        pic.thWidth = Math.floor(pic.thWidth / ratio)
        pic.thTop = -Math.floor((pic.thHeight / ratio - pic.thHeight) / 2)
      })
    }
  }

  Picture.prototype.resizeThumbToHeight = function(toHeight) {
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
});