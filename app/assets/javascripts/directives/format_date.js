angular.module('app').filter('formatDate', function($moment) {
  return function(date, type) {
    console.log('FORMAT', date, type)

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