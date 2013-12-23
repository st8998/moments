//=require comp/pictures/pictures_line
//=require models/picture
//=require models/account

/** @jsx React.DOM */

require(['comp/pictures/pictures_line', 'models/picture', 'models/account'],
function(PicturesLine, Picture, Account) {
  Account.getDemoAccount(function(account) {
    var pictures = $.get('/api/v1/' + account.key + '/pictures')

    React.renderComponent(<PicturesLine pictures={pictures} maxWidth={900} maxHeight={400} enhanceRatio={0.2} />, document.querySelector('#pictures-line'))
  })
})