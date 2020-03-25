import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plants: []
    };
  }

  componentDidMount() {
    const url = `http://localhost:3001/api/v1/plants/`
    axios
      .get(url, { withCredentials: true })
      .then(response => {
        if (response.statusText == 'OK') {          
          return response.data;
        }
        throw new Error('Network response was not ok.');
      })
      .then(json => {
        console.log(json)
          this.setState({
            plants: json.plants
          })
      })
      .catch(() => this.props.history.push('/'))
  }
  
  handleClick = () => {
    axios
      .delete('http://localhost:3001/logout', { withCredentials: true })
      .then(response => {
        this.props.handleLogout()
        this.props.history.push('/')
      })
      .catch(error => console.log(error))
  }

  render () {
    const { plants } = this.state;
    const allPlants = plants.map(plant => (
      <div key={plant.id} className='col-md-6 col-lg-4'>
        <div className='card mb-4'>
          <img
            src={plant.image}
            className='card-img-top'
            alt={`${plant.name} image`}
          />
          <div className='card-body'>
            <h5 className='card-title'>{plant.name}</h5>
            <Link
              to={`/api/v1/users/${this.props.user.id}/plants/${plant.id}`}
              className='btn'
            >
              View Plant
            </Link>
          </div>
        </div>
      </div>
    ))
    const noPlant = (
      <div className='vw-100 vh-50 d-flex align-items-center justify-content-center'>
        <h4>
          No plants yet. Why not <Link to='/api/v1/new_plant'>create one</Link>
        </h4>
      </div>
    )

    return (
      <div>
        <div className='d-flex align-items-center justify-content-center vw-100 vh-100 primary-color'>
          <div className='jumbotron jumbotron-fluid bg-transparent'>
            <h5>
              <strong>{this.props.user.username}</strong>
            </h5>
            {this.props.loggedInStatus === 'LOGGED_IN' ? (
              <Link to='/logout' onClick={this.handleClick}>
                Log Out
              </Link>
            ) : (
              <Link to='/login'>Log In</Link>
            )}
            <br />
            {this.props.loggedInStatus === 'LOGGED_IN' ? null : (
              <Link to='/signup'>Create Account</Link>
            )}
            <br />
            <div className='container secondary-color'>
              <h1 className='display-4'>Grove Guardian</h1>
              <p className='lead'>Keep your plants properly watered.</p>
              <hr className='my-4' />
            </div>
          </div>
        </div>
        {this.props.loggedInStatus === 'LOGGED_IN' && (
          <div className='container secondary-color'>
            <div className='row'>
              <div className='col-md-4'>
                <Link to='/api/v1/plants' className='btn btn-lg btn-primary'>
                  View Your Plants
                </Link>
              </div>
              <div className='col-md-4 ml-auto'>
                <Link
                  to={`/api/v1/users/${this.props.user.id}/plant`}
                  className='btn btn-lg btn-primary'
                >
                  Create New Plant
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className='py-5 container'>
          <div className='row'>
            {plants.length > 0 ? allPlants : noPlant}
          </div>
        </div>
      </div>
    )
  }
}
