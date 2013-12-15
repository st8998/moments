define('models/picture', [], function() {
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

  Picture.prototype.getThumbStyle = function() {
    return {height: this.thHeight || this.height, width: this.thWidth || this.width, left: this.thLeft}
  }

  Picture.prototype.getUrl = function() {
    if (this.image_url_small)
      return this.image_url_small
    if (this.image_data)
      return this.image_data
  }

  Picture.maxWidth = 805
  Picture.maxThumbHeight = 531
  Picture.fitThumbsInRow = function(pics) {
    // adapt all images to same height of Picture.maxHeight
    _.each(pics, function(pic) { pic.resizeThumbToHeight(Picture.maxThumbHeight) })

    var totalWidth = _.reduce(pics, function(memo, pic) {return memo+pic.thWidth}, 0)
    var ratio = (Picture.maxWidth - pics.length*3 + 3) / totalWidth

    var offset = 0

    // adjust height/width of each images according ratio
    _.each(pics, function(pic) {
      pic.thWidth = pic.thWidth * ratio
      pic.thHeight = pic.thHeight * ratio

      // keep watching for maxThumb height
      if (pic.thHeight > Picture.maxThumbHeight)
        pic.resizeThumbToHeight(Picture.maxThumbHeight)

      pic.thWidth = Math.floor(pic.thWidth)
      pic.thHeight = Math.floor(pic.thHeight)

      // calculate left offset
      pic.thLeft = offset
      offset += pic.thWidth + 3
    })
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