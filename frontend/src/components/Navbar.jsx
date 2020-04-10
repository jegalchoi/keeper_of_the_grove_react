import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../context'

export const Navbar = () => {
  // constructor(props) {
  //   super(props)
  // }

  const [state, dispatch] = useContext(PlantContext)

  const { username, isLoading, error, permissions } = state

  const handleLogout = () => {
    axios
      .delete('http://localhost:3001/logout', {
        withCredentials: true,
      })
      .then(response => {
        dispatch({ type: 'AUTH_LOGOUT' })
        history.push('/')
      })
      .catch(error => console.log(error))
  }

  const history = useHistory()

  return (
    <nav className='navbar navbar-dark bg-success navbar-expand-sm px-sm-5'>
      <Link to='/'>
        <img
          src='https://placeimg.com/320/240/nature'
          alt='watercan'
          className='navbar-brand img-fluid'
          style={{ width: 64, height: 48 }}
        />
      </Link>

      <div className='ml-auto'>
        <div className='mr-2'>
          {permissions === 'LOGGED_IN' && (
            <Link to='/editUser'>
              <h5>
                <strong>{username}</strong>
              </h5>
            </Link>
          )}
          {permissions === 'LOGGED_IN' ? (
            <Link to='/' onClick={handleLogout}>
              Log Out
            </Link>
          ) : (
            <Link to='/login'>Log In</Link>
          )}
          <br />
          {permissions === 'NOT_LOGGED_IN' && (
            <Link to='/signup'>Create Account</Link>
          )}
          <br />
        </div>
      </div>
    </nav>
  )
}
