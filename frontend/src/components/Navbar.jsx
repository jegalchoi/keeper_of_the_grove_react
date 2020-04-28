import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOilCan } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {
  const [
    {
      siteIsLoading,
      formIsLoading,
      permissions,
      username,
      displayUserPlants,
    },
    dispatch,
  ] = useContext(PlantContext)

  const handleLogout = () => {
    console.log('logging out')

    dispatch({ type: 'SITE_START_LOADING' })
    axios
      .delete('http://localhost:3001/logout', {
        withCredentials: true,
      })
      .then((response) => {
        dispatch({ type: 'AUTH_LOGOUT' })
        history.push('/')
      })
      .catch((error) => console.log(error))
  }

  const history = useHistory()

  const truncString = (str, max) => {
    return typeof str === 'string' && str.length > max
      ? str.substring(0, max) + '...'
      : str
  }

  return (
    <nav className='navbar bg-success navbar-expand-sm px-sm-5'>
      <Link to='/' onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}>
        <div className='px-3'>
          <FontAwesomeIcon icon={faOilCan} size='3x' color='black' />
        </div>
      </Link>
      {siteIsLoading || formIsLoading ? null : (
        <React.Fragment>
          <ul className='navbar-nav align-items-center'>
            {permissions === 'LOGGED_IN' && (
              <li className='nav-item ml-auto'>
                <Link to='/' className='nav-link'>
                  <button
                    style={{ width: '200px' }}
                    className='text-capitalize'
                    onClick={() =>
                      dispatch({
                        type: 'PLANT_DISPLAY_TOGGLE',
                        payload: !displayUserPlants,
                      })
                    }
                  >
                    {displayUserPlants
                      ? 'show all plants'
                      : 'show only your plants'}
                  </button>
                </Link>
              </li>
            )}
            {permissions === 'LOGGED_IN' && (
              <li className='nav-item ml-auto'>
                <Link
                  to={'/new'}
                  className='nav-link text-capitalize'
                >
                  <strong>create new plant</strong>
                </Link>
              </li>
            )}
          </ul>
        </React.Fragment>
      )}
      <div className='ml-auto text-right'>
        <div>
          {siteIsLoading || formIsLoading ? (
            <strong>loading...</strong>
          ) : (
            permissions === 'LOGGED_IN' && (
              <Link to='/editUser'>
                <h5>
                  <strong>{truncString(username, 20)}</strong>
                </h5>
              </Link>
            )
          )}
          {siteIsLoading || formIsLoading ? null : permissions ===
            'LOGGED_IN' ? (
            <Link
              to='/'
              className='text-capitalize'
              onClick={handleLogout}
            >
              log out
            </Link>
          ) : (
            <Link to='/login' className='text-capitalize'>
              log in
            </Link>
          )}
          <br />
          {siteIsLoading || formIsLoading
            ? null
            : permissions === 'NOT_LOGGED_IN' && (
                <Link to='/signup' className='text-capitalize'>
                  create account
                </Link>
              )}
          <br />
        </div>
      </div>
    </nav>
  )
}
