$(function() {
  console.log('LOADED')

  $('ul.users').on('change', 'input[type=radio]', function(e) {
    $(e.delegateTarget).find('li').removeClass('selected')
    $(this).closest('li').addClass('selected')
  })

})