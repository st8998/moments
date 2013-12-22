//=require comp/pictures/pictures_line
//=require models/picture
//=require models/account

/** @jsx React.DOM */

require(['comp/pictures/pictures_line', 'models/picture', 'models/account'],
function(PicturesLine, Picture, Account) {
  Account.getDemoAccount(function(account) {
    var pictures

    $.get('/api/v1/' + account.key + '/pictures', function(data) {
      pictures = _.map(data, function(attrs) {
        return new Picture(attrs)
      })

      React.renderComponent(<PicturesLine pictures={pictures} maxWidth={900} maxHeight={300} enhanceRatio={0.2} />, document.querySelector('#pictures-line'))
    }.bind(this))
  })
})