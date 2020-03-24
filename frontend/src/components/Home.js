import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Home = props => {
  const handleClick = () => {
    axios
      .delete('http://localhost:3001/logout', { withCredentials: true })
      .then(response => {
        props.handleLogout()
        props.history.push('/')
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <div className='d-flex align-items-center justify-content-center vw-100 vh-100 primary-color'>
        <div className='jumbotron jumbotron-fluid bg-transparent'>
          <h5>
            <strong>{props.user.username}</strong>
          </h5>
          {props.loggedInStatus === 'LOGGED_IN' ? (
            <Link to='/logout' onClick={handleClick}>
              Log Out
            </Link>
          ) : (
            <Link to='/login'>Log In</Link>
          )}
          <br />
          {props.loggedInStatus === 'LOGGED_IN' ? null : (
            <Link to='/signup'>Create Account</Link>
          )}
          <br />
          <div className='container secondary-color'>
            <h1 className='display-4'>Grove Guardian</h1>
            <p className='lead'>Keep your plants properly watered.</p>
            <hr className='my-4' />
            <Link to='/plants' className='btn btn-lg btn-primary'>
              View Plants
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
