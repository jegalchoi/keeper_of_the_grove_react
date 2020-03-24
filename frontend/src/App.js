import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import { Plants } from './components/Plants'
import { Plant } from './components/Plant'
import { NewPlant } from './components/NewPlant'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: 'NOT_LOGGED_IN',
      user: {},
    }
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios
      .get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response.data)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('check login api errors:', error))
  }

  handleLogin = data => {
    this.setState({
      isLoggedIn: 'LOGGED_IN',
      user: data.user,
      username: data.user.username
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: 'NOT_LOGGED_IN',
      user: {},
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={`/api/v1/users/${this.state.user.id}/plants/:id`}
              render={props => (
                <Plant
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path={`/api/v1/users/${this.state.user.id}/plant`}
              render={props => (
                <NewPlant
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            {/* <Route
              exact path='/plant'
            /> */}
            <Route
              exact
              path='/api/v1/plants'
              render={props => (
                <Plants
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path='/'
              render={props => (
                <Home
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path='/login'
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path='/signup'
              render={props => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
