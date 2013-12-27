//=require models/api
//=require comp/pictures/pictures_line
//=require comp/pictures/pictures_uploader
//=require models/picture
//=require models/account

/** @jsx React.DOM */

require(
  [ 'api',
    'comp/pictures/pictures_line',
    'comp/pictures/pictures_uploader',
    'models/picture',
    'models/account'],
function(api, PicturesLine, PicturesUploader, Picture, Account) {
  api.getDemoAccount(function(api) {
    $.get(api('/pictures')).success(function(data) {
      var pictures = _.map(data, function(attrs) { return new Picture(attrs)})

      var onPicturesChange = function(pictures) {
        React.renderComponent(
          <PicturesLine pictures={pictures} maxWidth={900} maxHeight={100} enhanceRatioWidth={0.9} />,
          document.querySelector('#pictures-line')
        )
      }

      React.renderComponent(
        <PicturesUploader
          onPicturesChange={onPicturesChange}
          api={api}
          pictures={pictures}
          maxWidth={900} maxHeight={500}
          enhanceRatioWidth={0.7} enhanceRatioHeight={0.8} />,
        document.querySelector('#pictures-uploader')
      )

      onPicturesChange(pictures)
    })
  })
})