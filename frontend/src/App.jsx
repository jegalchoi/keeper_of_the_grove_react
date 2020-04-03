import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { PlantConsumer } from './context'
import Default from './components/Default.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './components/registrations/Login.jsx'
import Signup from './components/registrations/Signup.jsx'
import EditUser from './components/registrations/EditUser.jsx'

class App extends Component {
  render() {
    return (
      <PlantConsumer>
        {value => (
          <React.Fragment>
            <Navbar
              history={this.props.history}
              handleLogout={value.handleLogout}
              
            />
            <Switch>
              <Route
                exact path='/login'
                render={props => (
                  <Login
                    {...props}
                    handleLogin={value.handleLogin}
                    loggedInStatus={value.isLoggedIn}
                  />
                )}
              />
              <Route
                exact path='/signup'
                render={props => (
                  <Signup
                    {...props}
                    handleLogin={value.handleLogin}
                    loggedInStatus={value.isLoggedIn}
                  />
                )}
              />
              <Route
                exact path='/editUser'
                render={props => (
                  <EditUser
                    {...props}
                    username={value.user.username}
                    email={value.user.email}
                    id={value.user.id}
                    handleLogout={value.handleLogout}
                  />
                )}
              />
              <Route component={Default} />
            </Switch>
          </React.Fragment>
        )}
      </PlantConsumer>
    )
  }
}

export default withRouter(App)
