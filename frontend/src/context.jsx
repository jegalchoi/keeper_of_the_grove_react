import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const PlantContext = React.createContext();

class PlantProvider extends Component {
  state = {
    plants: [],
    detailPlant: '',
    displayUserPlants: false,
    isLoggedIn: 'NOT_LOGGED_IN',
    user: {},
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
      displayUserPlants: false,
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: 'NOT_LOGGED_IN',
      displayUserPlants: false,
      user: {},
    })
  }

  

  render() {
    return (
      <PlantContext.Provider
        value={{
          ...this.state,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          
        }}
      >
        {this.props.children}
      </PlantContext.Provider>
    )
  }
}

const PlantConsumer = PlantContext.Consumer;

export { PlantProvider, PlantConsumer }
