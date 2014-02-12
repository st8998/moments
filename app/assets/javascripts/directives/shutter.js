angular.module('app').directive('mShutter', ['d3', 'sequence', function(d3, seq) {

  function sin(deg) {
    return Math.sin(deg*Math.PI/180)
  }
  function cos(deg) {
    return Math.cos(deg*Math.PI/180)
  }

  return {
    restrict: 'E',
    replace: true,

    template: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>',

    compile: function(elem, attrs) {
      var circleCutOff = seq('circle-cut-off-')

      var w = parseInt(attrs['w']) || 100,
        r2 = w/2,
        r3 = r2*1.2,
        n = parseInt(attrs['n']) || 7,
        factor = parseFloat(attrs['factor']) || 0.16,
        fill = attrs['fill'] || 'black',
        stroke = attrs['stroke'] || 'white',
        openAngle = attrs['openAngle'] || 40

      var svg = d3.select(elem.get(0)).attr('width', w).attr('height', w).attr('class', attrs['class'])
      var clip = svg.append('clipPath').attr('id', circleCutOff)
        .append('circle').attr('cx', w/2).attr('cy', w/2).attr('r', r2)

      svg.attr('clip-path', 'url(#'+circleCutOff+')')

      var blades = [],
        bladeA = 360/ n,
        bladeL = r2*5

      for (var i = 0; i < n; i++) {
        var c = bladeA*i,
          u = c - (1-factor)*bladeA*1.05,
          d = c + factor*bladeA*1.05

        blades.push([
          {x: w/2+bladeL*cos(u), y: w/2+bladeL*sin(u)},
          {x: w/2+bladeL*cos(d), y: w/2+bladeL*sin(d)},
          {x: w/2+r3*cos(c), y: w/2+r3*sin(c)}
        ])
      }

      svg.selectAll('path.shutter-blade').data(blades).enter()
        .append('path')
        .attr('class', 'shutter-blade')
        .attr('d', function(p) {
          return ['M', w/2, w/2, 'L', p[0].x, p[0].y, 'L', p[1].x, p[1].y, 'Z'].join(' ')
        })
        .attr('transform', function(d) {
          return 'rotate('+openAngle+' '+d[2].x+' '+d[2].y+')'
        })

      var body = svg.append('circle')
        .attr('class', 'shutter-body')
        .attr('cx', w/2)
        .attr('cy', w/2)
        .attr('r', r2)
        .attr('fill', 'transparent')

      var stopAnimate = true,
        start, moment, speed, closing,
        maxOpen = 90, open = maxOpen,
        interpolate = d3.interpolate(openAngle, 0)

      function animateStep() {
        if (closing) {
          moment = Math.pow((new Date() - start)/speed, 0.5)
        } else {
          moment = Math.pow((new Date() - start)/speed, 2)
        }

        open = interpolate(moment)

        if (open > maxOpen) {
          interpolate = d3.interpolate(maxOpen, 0)
          closing = true
          start = new Date()
        } else if (open < 0) {
          interpolate = d3.interpolate(0, maxOpen)
          closing = false
          start = new Date()
        } else {
          svg.selectAll('path.shutter-blade').data(blades).attr('transform', function(d) {
            return 'rotate('+open+' '+d[2].x+' '+d[2].y+')'
          })
        }

        if (stopAnimate) {
          interpolate = d3.interpolate(open, openAngle)
        }

        return stopAnimate && open === openAngle
      }

      return function(scope, elem, attrs) {
        attrs.$observe('animate', function(val) {
          var animate = val && val !== 'false'

          stopAnimate = true
          if (animate) {
            stopAnimate = false
            setTimeout(function() {
              start = new Date()
              interpolate = d3.interpolate(openAngle, 0)
              closing = true
              speed = parseInt(animate) || 1000
              d3.timer(animateStep)
            }, 0)
          }
        })
      }
    }
  }

}])