angular.module('app').factory('Photo', function(sequence) {
  /**
   * @property {Number} id server side photo id
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
  function Photo(attrs) {
    _.extend(this, attrs)
  }

  Photo.prototype.attributes = function(key) {
    return _.pick(this, 'id', 'description', 'position')
  }

  Photo.prototype.assignAttributes = function(attrs) {
    _.extend(this, attrs)
  }

//  Photo.layoutPhotos2 = function(pics, opts) {
//    // cleanup previous calculations and optimisations
//    _.each(pics, function(pic) {
//      pic.thTop = 0
//      pic.thLeft = 0
//      pic.thHeight = 0
//      pic.thWidth = 0
//    })
//
//    var maxWidth = opts.maxWidth
//      , maxHeight = opts.maxHeight
//      , gap = 2
//
//    var outHeight = 0
//
//    // compute ratio
//    _.each(pics, function(pic) {
//      pic.ratio = pic.width / pic.height
//    })
//
//    // resize all images to maxHeight
//    _.each(pics, function(pic) {
//      pic.resizeToHeight(maxHeight)
//    })
//
////    var totalWidth = _.reduce(pics, function(sum, pic) { return sum + pic.thWidth }, 0)
//    var rows = 2
//
//    var parts = linear_partition(_.map(pics, 'thWidth'), rows)
//
//    var line1 = _.first(pics, parts[0].length)
//
//    function fitRow(pics) {
//      var width = _.reduce(pics, function(sum, p) { return sum + p.width }, 0)
//
//      var factor = maxWidth/width
//
//      _.each(pics, function(pic, i) {
//        pic.thHeight = pic.height*factor
//        pic.thWidth = pic.width*factor
//        if (i > 0) {
//          pic.cLeft = pics[i-1].cLeft + pics[i-1].thWidth
//        }
//      })
//    }
//
//    fitRow(line1)
//    var outHeight = line1[0].thHeight
//
//    if (parts.length == 2) {
//      var line2 = _.first(pics, parts[1].length)
//      fitRow(line2)
//
//      var line1Height = line1[0].thHeight
//
//      _.each(line2, function(pic) {
//        pic.cTop = line1Height
//      })
//
//      outHeight += line2[0].thHeight
//    }
//
//    return {width: maxWidth, height: outHeight}
//  }

  Photo.prototype.getContainerStyle = function() {
    return {
      height: (this.thHeight || this.height) - 2, // 2 is a gap between pics
      width: (this.thWidth || this.width) - 2, // 2 is a gap between pics
      left: this.cLeft || 0,
      top: this.cTop || 0,
      'background': 'url(' + this.getUrl() + ') center/cover'
    }
  }

  Photo.prototype.getImageDragStyle = function() {
    return {
      height: this.thHeight
    }
  }

  Photo.prototype.getUrl = function() {
    if (this.image_url_original && (this.thHeight > 1024 || this.thWidth > 1024))
      return this.image_url_original
    if (this.image_url_1024 && (this.thHeight > 512 || this.thWidth > 512))
      return this.image_url_1024
    if (this.image_url_512 && (this.thHeight > 256 || this.thWidth > 256))
      return this.image_url_512
    if (this.image_url_256)
      return this.image_url_256
  }

  Photo.thWidth = function(pics) {
    return _.reduce(pics, function(sum, pic) {
      return sum + pic.thWidth
    }, 0)
  }

  Photo.fitAndEnhanceRow = function(pics, opts) {
    var dims = Photo.fitInRow(pics, opts.maxWidth, opts.maxHeight)

    if (opts.enhanceRatioWidth != 1)
      Photo.enhanceRowWidth(pics, opts.maxWidth, opts.enhanceRatioWidth, opts.enhanceRatioHeight)

    if (opts.enhanceRatioHeight != 1)
      Photo.enhanceRowHeight(pics, opts.maxHeight, opts.enhanceRatioWidth)

    return {height: pics[0].getContainerStyle().height + 2, width: dims.width}
  }

  Photo.layoutPhotos2 = function(pics, options) {
    // collect options
    options = options || {}
    var maxHeight = options.maxHeight,
      maxWidth = options.maxWidth + 5, // 5 is a reserve for rounding
      enhanceRatioWidth = options.enhanceRatioWidth || 1,
      enhanceRatioHeight = options.enhanceRatioHeight || 1,
      rowHeight = options.rowHeight || maxHeight / 2.5,
      burstFirst = options.burstFirst || 0

    // cleanup previous calculations and optimisations
    _.each(pics, function(pic) {
      pic.thTop = 0
      pic.thLeft = 0
      pic.thHeight = 0
      pic.thWidth = 0
    })

    // try to fit all images in one row
    var dims = Photo.fitInRow(pics, maxWidth, maxHeight),
      oneLineHeight = dims.height,
      oneLineWidth = dims.width

    if (maxHeight / 2 - dims.height > rowHeight * 0.1) {
      // set rowHeight for all pics
      _.each(pics, function(pic) {
        pic.resizeToHeight(rowHeight)
      })

      var i = -1, totalWidth = _.reduce(pics, function(sum, w) {
        i += 1
        return sum + (i >= burstFirst ? w.thWidth : w.thWidth * 2)
      }, 0)

      var rows = Math.floor(totalWidth / maxWidth + 0.3)

      var weights = _.map(pics, function(pic, i) {
        var width = pic.thWidth > pic.thHeight ? pic.thWidth * enhanceRatioWidth : pic.thWidth
        return i >= burstFirst ? width : width * 2
      })

      var parts = linear_partition(weights, rows)

      var line, dims, top = 0, skip = 0

      _.each(parts, function(part, i) {
        if (i > 0) {
          line = pics.slice(skip, skip + part.length)
          dims = Photo.fitAndEnhanceRow(line, {
            maxWidth: maxWidth,
            maxHeight: rowHeight,
            enhanceRatioWidth: options.enhanceRatioWidth,
            enhanceRatioHeight: options.enhanceRatioHeight
          })
          Photo.updateOffsets(line, {top: top})
          top += dims.height
          skip += line.length
        } else {
          line = pics.slice(0, part.length)
          dims = Photo.fitAndEnhanceRow(line, {
            maxWidth: maxWidth,
            maxHeight: burstFirst > 0 ? rowHeight * 1.5 : rowHeight,
            enhanceRatioWidth: options.enhanceRatioWidth,
            enhanceRatioHeight: options.enhanceRatioHeight
          })
          Photo.updateOffsets(line)
          top = dims.height
          skip = part.length
        }
      })

      return {height: top, width: maxWidth}
    } else {
      dims = Photo.fitAndEnhanceRow(pics, {
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        enhanceRatioWidth: options.enhanceRatioWidth,
        enhanceRatioHeight: options.enhanceRatioHeight
      })
      Photo.updateOffsets(pics)
      return dims
    }
  }


  Photo.layoutPhotos = function(pics, options) {

    // collect options
    options = options || {}
    var maxHeight = options.maxHeight,
      maxWidth = options.maxWidth + 5, // 5 is a reserve for rounding
      enhanceRatioWidth = options.enhanceRatioWidth || 1,
      enhanceRatioHeight = options.enhanceRatioHeight || 1

    var enhancedHeight = maxHeight / enhanceRatioHeight,
      enhancedWidth = maxWidth / enhanceRatioWidth

    // cleanup previous calculations and optimisations
    _.each(pics, function(pic) {
      pic.thTop = 0
      pic.thLeft = 0
      pic.thHeight = 0
      pic.thWidth = 0
    })

    // try to fit all images in one row
    var dims = Photo.fitInRow(pics, maxWidth, maxHeight),
      oneLineHeight = dims.height,
      oneLineWidth = dims.width

    // make two lines
    // one with 2/3 of total height and one with 1/3 height
    if (oneLineHeight * 5 < enhancedHeight) {
      var firstLine = [], secondLine = []

      var takenWidth = 0, notEnough = true, ratio = (enhancedHeight + maxHeight) / 2 * 0.6 / pics[0].thHeight

      _.each(pics, function(pic) {
        if (notEnough && takenWidth + pic.thWidth * ratio < enhancedWidth) {
          takenWidth += pic.thWidth * ratio
          firstLine.push(pic)
        } else {
          notEnough = false
          secondLine.push(pic)
        }
      })

      var firstLineDims = Photo.fitAndEnhanceRow(firstLine, {
        maxWidth: maxWidth,
        maxHeight: maxHeight * 0.6,
        enhanceRatioWidth: options.enhanceRatioWidth,
        enhanceRatioHeight: options.enhanceRatioHeight
      })
      Photo.updateOffsets(firstLine)

      var secondLineDims = Photo.fitAndEnhanceRow(secondLine, {
        maxWidth: maxWidth,
        maxHeight: maxHeight * 0.4,
        enhanceRatioWidth: options.enhanceRatioWidth,
        enhanceRatioHeight: options.enhanceRatioHeight
      })
      Photo.updateOffsets(secondLine, {top: firstLineDims.height})

      return {height: firstLineDims.height + secondLineDims.height, width: firstLineDims.width}
    } else {
      if (enhanceRatioWidth != 1)
        Photo.enhanceRowWidth(pics, maxWidth, enhanceRatioWidth, enhanceRatioHeight)

      if (enhanceRatioHeight != 1)
        Photo.enhanceRowHeight(pics, maxHeight, enhanceRatioWidth)

      Photo.updateOffsets(pics)

      return {height: pics[0].getContainerStyle().height + 2, width: dims.width}
    }
  }

  Photo.fitInRow = function(pics, maxWidth, maxHeight) {
    // adapt all images to same height of Photo.maxHeight
    _.each(pics, function(pic) {
      pic.resizeToHeight(maxHeight)
    })

    var totalWidth = _.reduce(pics, function(memo, pic) {
      return memo + pic.thWidth
    }, 0)

    if (maxWidth) {
      var ratio = maxWidth / totalWidth

      // adjust height/width of each images according ratio
      _.each(pics, function(pic) {
        pic.thWidth = Math.floor(pic.thWidth * ratio)
        pic.thHeight = Math.floor(pic.thHeight * ratio)

        // keep watching for maxThumb height
        if (pic.thHeight > maxHeight)
          pic.resizeToHeight(maxHeight)
      })

      return {height: pics[0] ? pics[0].thHeight : 0, width: _.reduce(pics, function(memo, pic) {
        return memo + pic.thWidth
      }, 0)}
    } else {
      return {height: pics[0] ? pics[0].thHeight : 0, width: totalWidth}
    }
  }

  Photo.enhanceRowWidth = function(pics, maxWidth, enhanceRatioWidth, enhanceRatioHeight) {
    var landscapes = _.select(pics, function(pic) {
        return pic.width > pic.height
      })
      , portraits = _.select(pics, function(pic) {
        return pic.width <= pic.height
      })

    var totalWidth = Photo.thWidth(pics)
      , landscapeWidth = Photo.thWidth(landscapes)
      , portraitWidth = Photo.thWidth(portraits)

    var landscapeRatio = landscapeWidth / (maxWidth - portraitWidth)
      , portraitRatio = portraitWidth / (maxWidth - landscapeWidth)
      , totalRatio = totalWidth / maxWidth

    if (totalWidth > maxWidth && enhanceRatioWidth < landscapeRatio && landscapeRatio < 0.99) {
      _.each(landscapes, function(pic) {
        pic.thWidth = Math.floor(pic.thWidth / landscapeRatio)
        pic.thTop = -Math.floor((pic.thHeight / landscapeRatio - pic.thHeight) / 2)
      })
    } else if (totalWidth <= maxWidth && enhanceRatioHeight < portraitRatio && portraitRatio < 0.99) {
      _.each(portraits, function(pic) {
        pic.thWidth = Math.floor(pic.thWidth / portraitRatio)
        pic.thTop = -Math.floor((pic.thHeight / portraitRatio - pic.thHeight) / 2)
      })
    } else if (enhanceRatioWidth < totalRatio && totalRatio < 0.99) {
      _.each(pics, function(pic) {
        pic.thWidth = Math.floor(pic.thWidth / totalRatio)
        pic.thTop = -Math.floor((pic.thHeight / totalRatio - pic.thHeight) / 2)
      })
    }
  }

  Photo.enhanceRowHeight = function(pics, maxHeight, enhanceRatioWidth) {
    if (pics.length && pics[0].thHeight < maxHeight) {
      var height = pics[0].thHeight
      var ratio = height / maxHeight

      // take ratio that will make minimum impact
      // max between current ratio an configured one
      var enhanceRatio = enhanceRatioWidth > ratio ? enhanceRatioWidth : ratio

      _.each(pics, function(pic) {
        pic.thHeight = Math.floor(pic.thHeight / enhanceRatio)
        pic.thLeft = -Math.floor((pic.thWidth / enhanceRatio - pic.thWidth) / 2)
      })
    }
  }

  Photo.updateOffsets = function(pics, offset) {
    offset = offset || {}
    var left = offset.left || 0
    var top = offset.top || 0

    _.each(pics, function(pic) {
      pic.cLeft = left
      pic.cTop = top
      left += pic.thWidth
    })
  }

  Photo.prototype.resizeToHeight = function(toHeight) {
    var ratio = this.height / toHeight

    this.thWidth = this.width / ratio
    this.thHeight = toHeight

    return this
  }

  return Photo
})
