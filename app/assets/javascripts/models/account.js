define('models/account', function() {

  function Account(attrs) {
    _.extend(this, attrs)
  }

  Account.getDemoAccount = function(callback) {
    if (Cookies.get('dakey')) {
      callback(new Account({key: Cookies.get('dakey')}))
    } else {
      $.post('/api/v1/accounts/demo', function(accountAttrs) {
        var acc = new Account(accountAttrs)

        Cookies.set('dakey', acc.key, {path: '/blog', expires: '2015/01/01'})
        callback(acc)
      })
    }
  }

  return Account
})