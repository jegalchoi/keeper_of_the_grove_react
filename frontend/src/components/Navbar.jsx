import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../context'

export const Navbar = () => {
  // constructor(props) {
  //   super(props)
  // }

  const [state, dispatch] = useContext(PlantContext)

  const { username, isLoading, authIsLoading, permissions } = state

  const handleLogout = () => {
    console.log('logging out')

    dispatch({ type: 'AUTH_LOADING' })
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
      <Link to='/' onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}>
        <img
          src='https://placeimg.com/320/240/nature'
          alt='watercan'
          className='navbar-brand img-fluid'
          style={{ width: 64, height: 48 }}
        />
      </Link>

      <div className='ml-auto'>
        <div className='mr-2'>
          {isLoading || authIsLoading ? (
            <strong>
              <h5>loading...</h5>
            </strong>
          ) : (
            permissions === 'LOGGED_IN' && (
              <Link
                to='/editUser'
                onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
              >
                <h5>
                  <strong>{username}</strong>
                </h5>
              </Link>
            )
          )}
          {isLoading || authIsLoading ? null : permissions ===
            'LOGGED_IN' ? (
            <Link
              to='/'
              className='text-capitalize'
              onClick={handleLogout}
            >
              log out
            </Link>
          ) : (
            <Link
              to='/login'
              className='text-capitalize'
              onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
            >
              log in
            </Link>
          )}
          <br />
          {isLoading || authIsLoading
            ? null
            : permissions === 'NOT_LOGGED_IN' && (
                <Link
                  to='/signup'
                  className='text-capitalize'
                  onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
                >
                  create account
                </Link>
              )}
          <br />
        </div>
      </div>
    </nav>
  )
}
