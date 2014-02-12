angular.module('app').directive('mHexagon', ['d3', '$window', function(d3, $window) {

  return {
    restrict: 'E',

    replace: 'true',
    template: '<div class="hexagon-component"><div class="hexagon-deep"></div></div>',

    scope: {
      pics: '=pictures'
    },

    compile: function(elem, attrs) {
      var height = 400,
        imageWidth = 200,
        radius = imageWidth / 2,
        depth = 4


      // MUSE MOVE EFFECT SETTINGS
      var currentFocus = [$window.innerWidth / 2, height / 2],
        desiredFocus,
        idle = true

      var style = document.body.style,
        transform = ("webkitTransform" in style ? "-webkit-"
          : "MozTransform" in style ? "-moz-"
          : "msTransform" in style ? "-ms-"
          : "OTransform" in style ? "-o-"
          : "") + "transform";


      var hexbin = d3.hexbin()
        .radius(radius)

      var deep = d3.select(elem.get(0)).select('.hexagon-deep')

      var canvas = deep.append('canvas')
        .attr('height', height)

      var context = canvas.node().getContext('2d')

      var svg = deep.append('svg')
        .attr('height', height)

      var mesh = svg.append('path')
        .attr('class', 'hexagon-mesh')

      var anchor = svg.append('g')
        .attr('class', 'hexagon-anchor')
        .selectAll('a')

      var graphic = deep.selectAll('svg,canvas')

      function drawImage(d) {
        context.save()
        context.beginPath()
        context.moveTo(0, -radius)

        for (var i = 1; i < 6; ++i) {
          var angle = i * Math.PI / 3,
            x = Math.sin(angle) * radius,
            y = -Math.cos(angle) * radius
          context.lineTo(x, y)
        }

        context.clip()

        context.drawImage(d.image, -imageWidth/2, -imageWidth/2, imageWidth, imageWidth)
        context.restore()
      }

      function resized(data) {
        var deepWidth = $window.innerWidth * (depth + 1) / depth,
          deepHeight = height * (depth + 1) / depth,
          centers = hexbin.size([deepWidth, deepHeight]).centers()

        desiredFocus = [$window.innerWidth / 2, height / 2];
        moved()

        graphic
          .style('left', Math.round(($window.innerWidth - deepWidth) / 2) + 'px')
          .style('top', Math.round((height - deepHeight) / 2) + 'px')
          .attr('width', deepWidth)
          .attr('height', deepHeight)

        _.each(centers, function(center) {
          center.j = Math.round(center[1] / (radius * 1.5))
          center.i = Math.round((center[0] - (center.j & 1) * radius * Math.sin(Math.PI / 3)) / (radius * 2 * Math.sin(Math.PI / 3)))
          center.pic = data[((center.i % 10) + ((center.j + (center.i / 10 & 1) * 5) % 10) * 10)%data.length]

          center.pic.image = new Image()
          center.pic.image.src = center.pic.image_src

          center.pic.image.onload = function() {
            context.save()
            context.translate(Math.round(center[0]), Math.round(center[1]))
            drawImage(center.pic)
            context.restore()
          }
        })

        mesh.attr('d', hexbin.mesh)

        anchor = anchor.data(centers, function(d) { return d.i + ',' + d.j })

        anchor.exit().remove()

        anchor.enter().append('a')
          .append('path')
          .attr('d', hexbin.hexagon())

        anchor.attr('transform', function(d) { return 'translate('+d+')' })
      }

      function mousemoved() {
        var m = d3.mouse(this)

        desiredFocus = [
          Math.round((m[0] - innerWidth / 2) / depth) * depth + innerWidth / 2,
          Math.round((m[1] - height / 2) / depth) * depth + height / 2
        ]

        moved()
      }

      function moved() {
        if (idle) d3.timer(function() {
          if (idle = Math.abs(desiredFocus[0] - currentFocus[0]) < .5 && Math.abs(desiredFocus[1] - currentFocus[1]) < .5) currentFocus = desiredFocus;
          else currentFocus[0] += (desiredFocus[0] - currentFocus[0]) * .14, currentFocus[1] += (desiredFocus[1] - currentFocus[1]) * .14;
          deep.style(transform, "translate(" + ($window.innerWidth / 2 - currentFocus[0]) / depth + "px," + (height / 2 - currentFocus[1]) / depth + "px)");
          return idle;
        })
      }

      return function(scope, elem, attrs) {
        // TODO get rid of d3 listeners
        if (!('ontouchstart' in document)) d3.select(elem.get(0))
          .on('mousemove', mousemoved);

  //        d3.select($window)
  //          .on('resize', function() {
  //            if (scope.pics && scope.pics.length) resized(scope.pics)
  //          })

        scope.$watchCollection('pics', function(pics) {
          if (pics && pics.length) {
            pics = _.shuffle(pics)
            pics = _.map(pics, function(pic) {
              return {
                image_src: pic.image_url_square
              }
            })

            resized(pics)
          }
        })
      }
    }
  }



}])