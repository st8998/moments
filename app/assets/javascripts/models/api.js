define('api', [], function() {

  function buildApi(key) {
    var api = function() {
      return ('/api/v1/' + key + '/' + Array.prototype.join.call(arguments, '/')).replace(/\/\//g, '/')
    }

    api.getDemo = function(callback) {
      if (Cookies.get('dakey')) {
        callback(buildApi(Cookies.get('dakey')))
      } else {
        $.post(api('/accounts/demo'), function(accountAttrs) {
          Cookies.set('dakey', accountAttrs.key, {path: '/blog', expires: '2015/01/01'})
          callback(buildApi(accountAttrs.key))
        })
      }
    }

    return api
  }

  return buildApi(Cookies.get('akey'))
})