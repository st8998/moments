//= require location/select_location
/** @jsx React.DOM */
var smileClub = {
  lat: 53.21651837219011,
  lng: 50.15031337738037,
  route: 'Ново-Садовая',
  street_number: '151'
}

function printAddress(address) {
  console.log(address)
}

React.renderComponent(
  <SelectLocation address={smileClub} onAddressApply={printAddress} />,
  document.querySelector('#content .location-container'))
