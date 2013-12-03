/** @jsx React.DOM */

$(function() {
  $.get(Routes.users_path({format: 'json'})).success(function(users) {
    var LoginForm = React.createClass({
      getInitialState: function() {
        return {activeUserId: null}
      },

      handleRadioChange: function(event) {
        this.setState({activeUserId: event.target.value})
      },

      render: function() {
        var activeUserId = this.state.activeUserId
        var userItems = this.props.users.map(function(user) {
          return <User user={user} active={user.id == activeUserId} />
        })

        return (
          <form className="form-signin" url={Routes.login_path()} method="POST">
            <h2 className="form-signin-header">Please sign in</h2>
            <ul className="users list-group" onChange={this.handleRadioChange}>{userItems}</ul>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="password" name="user[password]" />
            </div>
            <button className="btn btn-lg btn-primary btn-block" disabled={!activeUserId}>Sign in</button>
          </form>)
      }
    })

    var User = React.createClass({
      render: function() {
        var user = this.props.user
        var className = 'list-group-item'
        if (this.props.active)
          className += ' selected'

        return (
          <li className={className}>
            <input type="radio" id={'user-'+user.id} name="user[id]" style={{display: 'none'}} value={user.id}/>
            <label htmlFor={'user-'+user.id}>
              <img src={user.avatar} />
              <h3>{user.name}</h3>
            </label>
          </li>)
      }
    })

    React.renderComponent(<LoginForm users={users} />, document.querySelector('.container'))
  })

})