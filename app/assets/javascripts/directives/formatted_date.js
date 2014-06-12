angular.module('app').directive('mFormattedDate', function($moment, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var date, timer

      attrs.$observe('mFormattedDate', function(attrDate) {
        date = $moment(attrDate, 'DD/MM/YYYY HH:mm')
        $timeout.cancel(timer)
        outputDate()
      })

      function outputDate() {
        if (date.isValid()) {
          var diff = moment.duration(moment().diff(date))
          var text

          if (moment().year() != date.year()) {
            text = date.format('DD MMM YYYY в HH:mm')
          } else if (diff.days() > 0) {
            text = date.format('DD MMM в HH:mm')
          } else if (diff.hours() > 0) {
            text = date.fromNow()
            timer = $timeout(outputDate, 60*60*1000)
          } else if (diff.minutes() > 0 || diff.seconds() > 45) {
            text = date.fromNow()
            timer = $timeout(outputDate, 60*1000)
          } else {
            text = date.fromNow()
            timer = $timeout(outputDate, (45-diff.seconds())*1000)
          }

          elem.text(text)
        }
      }

      elem.on('$destroy', function() {
        $timeout.cancel(timer)
      })
    }
  }
})

angular.module('app').filter('formatDate', function($moment) {
  return function(date, type) {
    if (!date) return

    var date = $moment(date)

    if (date.isValid()) {
      switch (type) {
        case 'pretty':
          if (moment.duration(moment().diff(date)).days() == 0) {
            return date.fromNow()
          } else {
            return date.format('DD MMM в HH:MM')
          }
        default:
          return date.format(type)
      }
    }
  }
})