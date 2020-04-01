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

  

  render() {
    return (
      <PlantContext.Provider
        value={{
          ...this.state,
          
        }}
      >
        {this.props.children}
      </PlantContext.Provider>
    )
  }
}

const PlantConsumer = PlantContext.Consumer;

export { PlantProvider, PlantConsumer }
