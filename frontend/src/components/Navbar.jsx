import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PlantConsumer } from '../context'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  handleClickLogout = () => {
    axios
      .delete('http://localhost:3001/logout', { withCredentials: true })
      .then(response => {
        this.props.handleLogout()
        
        this.props.history.push('/')
      })
      .catch(error => console.log(error))
  }

  

  render() {
    return (
      <PlantConsumer>
        {value => (
          <nav className='navbar navbar-dark bg-success navbar-expand-sm px-sm-5'>
            <Link to='/'>
              <img
                src='https://placeimg.com/320/240/nature'
                alt='watercan'
                className='navbar-brand img-fluid'
                style={{ width: 64, height: 48 }}
              />
            </Link>
            
            <div className="ml-auto">
              <div className='mr-2'>
                {value.isLoggedIn === 'LOGGED_IN' && (
                  <h5>
                    <strong>{value.user.username}</strong>
                  </h5>
                )}
                {value.isLoggedIn === 'LOGGED_IN' ? (
                  <Link to='/' onClick={this.handleClickLogout}>
                    Log Out
                  </Link>
                ) : (
                  <Link to='/login'>Log In</Link>
                )}
                <br />
                {value.isLoggedIn === 'NOT_LOGGED_IN' && (
                  <Link to='/signup'>Create Account</Link>
                )}
                <br />
              </div>
            </div>
          </nav>
        )}
      </PlantConsumer>
    )
  }
}
