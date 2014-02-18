/** @jsx React.DOM */
define('comp/location/show_location',
  ['settings', 'models/address'],
  function(settings, Address) {

    return React.createClass({
      getDefaultProps: function() {
        return {onAddressApply: Function.empty}
      },

      onNameChange: function(e) {
        var address = this.props.address
        address.name = e.target.value

        this.props.onAddressApply(address)
      },

      render: function() {
        var addressComp

        if (this.props.address && this.props.address.getLatLng()) {
          var address = this.props.address

          addressComp =
            <div className='map-with-address'>
              <img className='map' src={address.imageUrl()} onClick={this.props.onEditLocation} />
              <div className='address'>
                <h3 className='name'>
                  <input className='address-name' type='text' placeholder='название'
                  value={address.name}
                  onChange={this.onNameChange} />
                </h3>
                <p className='primary-line'>{address.primaryLine().join(', ')}</p>
                <p className='secondary-line'>{address.secondaryLine().join(', ')}</p>
                <p>
                  <a href='javascript:void(0)' onClick={this.props.onEditLocation}>изменить &rarr;</a>
                </p>
              </div>
            </div>
        } else {
          addressComp = <h3 className='no-address'>Место не указано (нажмите чтобы
            <a href='javascript:void(0)' onClick={this.props.onEditLocation}>задать</a>
          )</h3>
        }

        return (
          <div className='show-location-component'>
          {addressComp}
          </div>
          )
      }
    })
  })
